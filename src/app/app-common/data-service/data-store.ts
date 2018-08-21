import { DataStoreItem } from './store-item';
import * as objectHash from 'object-hash';
import { filter, mergeMap } from 'rxjs/operators';


interface Store {
  [dataItemIdentifier: string]: DataStoreItem<any>
}

export class DataStore {
  private readonly store: Store;

  readonly tempSelector = '_temp_';
  readonly permanentSelector = '_id_';

  constructor(store?: Store) {
    this.store = store || {};
  }

  private getStoreId(type: string, identity: string & number & any, asNew = false) {
    const id = typeof identity == 'object' ? identity.id : identity;
    if (id) {
      return `${type}${this.permanentSelector}${id}`;
    }
    else {
      let storedIds = Object.keys(this.store).filter(i => i.includes(type) && !i.includes(this.permanentSelector));
      if (asNew) {
        let generated = `${type}${this.tempSelector}${objectHash({identity})}`;
        let it = 0;
        do {
          generated += `_${it}`;
          it ++;
        } while (storedIds.find(i => i == generated));

        return generated;
      }
      else {
        storedIds = storedIds.filter(i => !this.store[i].permanentId);
        return storedIds[0];
      }
    }
  }

  private updateItemStoreId(storeId, item) {
    if (storeId.includes(this.permanentSelector)) {
      item.permanentId = storeId;
      this.store[storeId] = item;
    }
    else {
      item.tempId = storeId;
    }
  }

  private updateByStoreId(storeId, data) {
    const item = this.getByStoreId(storeId);
    item.subject$.next(data);
  }

  checkIsInStore(type: string, data): boolean {
    return !!this.store[this.getStoreId(type, data)]
  }

  getByStoreId(storeId: string): DataStoreItem<any> {
    if (!this.store[storeId]) {
      throw new Error(`store item [${storeId}] does not exist`);
    }

    return this.store[storeId];
  }

  getItem(type: string, id): DataStoreItem<any> {
    const storeId = this.getStoreId(type, {id});
    if (!this.store[storeId]) {
      throw new Error(`store item [${storeId}] does not exist`);
    }
    return this.store[storeId];
  }

  addItem(type: string, initialData): string {
    const item = new DataStoreItem(initialData);
    const storeId = this.getStoreId(type, initialData, true);
    if (this.store[storeId] && storeId.includes(this.tempSelector)) {
      throw new Error(`store item [${storeId}] already exists`);
    }

    this.updateItemStoreId(storeId, item);

    if (storeId.includes(this.tempSelector)) {
      const idChangeSubscription = item.subject$.pipe(
        filter(d => !!d && d.id)
      ).subscribe(newData => {
        const projectedStoreId = this.getStoreId(type, newData);
        if (!this.store[projectedStoreId]) {
          this.updateItemStoreId(projectedStoreId, item);
        }
        idChangeSubscription.unsubscribe();
      });
    }

    this.store[storeId] = item;
    return storeId;
  }

  updateItem(type: string, newData: any, oldData: any = {}): string {
    let storeId = this.getStoreId(type, oldData);
    if (!this.store[storeId]) {
      throw new Error(`cannot find item [${storeId}] to update`);
    }

    const item = this.store[storeId];

    this.updateItemStoreId(this.getStoreId(type, newData), item);

    if (oldData.id !== newData.id) {
      storeId = this.getStoreId(type, newData);
      this.store[storeId] = item;
    }


    item.subject$.next(newData);

    return storeId;
  }

  removeItem(type: string, data) {
    const storeId = this.getStoreId(type, data);
    if (!this.store[storeId]) {
      throw new Error(`cannot find item [${storeId}] to delete`);
    }
    this.store[storeId].subject$.complete();
    delete this.store[storeId];
    return storeId;
  }
}
