import { DataStore } from './data-store';
import { DataStoreItem } from './store-item';
import { fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';


describe('DataStore', () => {
  let dataStore: DataStore;
  beforeEach(() => {
    dataStore = new DataStore({
      'type_id_1': new DataStoreItem()
    });
  });

  it('should create', () => {
    expect(dataStore).toBeTruthy();
  });

  it('should get item by store id', () => {
    expect(dataStore.getByStoreId('type_id_1')).toBeTruthy();
  });

  it('should confirm item is present in store', () => {
    expect(dataStore.checkIsInStore('type', 1)).toBeTruthy();
    expect(dataStore.checkIsInStore('type', 3)).toBeFalsy();
  });

  describe('by type and id', () => {

    it('should get item', () => {
      const item = dataStore.getItem('type', 1);
      expect(item).toBeTruthy();
    });

    it('should add item', () => {
      expect(dataStore.addItem('type', {id: 2})).toEqual('type_id_2');
      const item = dataStore.getItem('type', 2);
      item.subject$.asObservable().subscribe(data => {
        expect(data).toEqual({id: 2});
      });
    });

    it('should add in flight item', fakeAsync(() => {
      const storeId = dataStore.addItem('type', of({id: 2}));
      expect(storeId.includes(dataStore.tempSelector)).toBeTruthy();
      tick();
      dataStore.getByStoreId(storeId).subject$.next({
        id: 2
      });
      tick();
      const item = dataStore.getItem('type', 2);
      item.subject$.asObservable().subscribe(data => {
        expect(data).toEqual({id: 2});
      });
    }));

    it('should update item', () => {
      dataStore.updateItem('type', {id: 1, updated: true}, {id: 1});
      dataStore.getItem('type', 1).subject$.asObservable().subscribe(d => {
        expect(d).toEqual({id: 1, updated: true});
      });
    });

    beforeEach(() => {
      spyOn(dataStore, 'getItem').and.callThrough();
    });

    it('should delete item', () => {
      dataStore.removeItem('type', 1);
      expect(dataStore.getItem.bind(dataStore, 'type', 1)).toThrowError('store item [type_id_1] does not exist');
    });
  });

  describe('with type only', () => {
    let tempId: string;
    beforeEach(() => {
       tempId = dataStore.addItem('type', {value: 2});
    });
    it('should create item with temp id', () => {
      expect(tempId.includes('_temp_')).toBeTruthy();
    });

    it('should update temp item id to permanent', fakeAsync(() => {
      const id = dataStore.updateItem('type', {value: 2, id: 10}, {value: 2});
      expect(id.includes('_id_')).toBeTruthy();
      tick();
      expect(dataStore.getItem('type', 10)).toBeTruthy();
    }));

    it('should update temp item id to permanent when added item updates', () => {
      const tempItem = dataStore.getByStoreId(tempId);
      tempItem.subject$.next({value: 2, id: 10});
      expect(dataStore.getItem('type', 10)).toBeTruthy();
    });

    describe('with multiple temp items', () => {
      let tempId2, tempId3;
      beforeEach(() => {
        tempId2 = dataStore.addItem('type', {value: 2}),
          tempId3 = dataStore.addItem('type', {value: 2});
      });

      it('should add items with same value', () => {
        expect(dataStore.getByStoreId(tempId)).toBeTruthy();
        expect(dataStore.getByStoreId(tempId3)).toBeTruthy();
        expect(dataStore.getByStoreId(tempId2)).toBeTruthy();
      });

      it('should update items', fakeAsync(() => {
        dataStore.getByStoreId(tempId).subject$.next({value: 2, id: 11});
        dataStore.getByStoreId(tempId2).subject$.next({value: 2, id: 12});
        dataStore.getByStoreId(tempId3).subject$.next({value: 2, id: 13});
        tick();
        expect(dataStore.getItem('type', 11)).toBeTruthy();
        expect(dataStore.getItem('type', 12)).toBeTruthy();
        expect(dataStore.getItem('type', 13)).toBeTruthy();
      }));

    });
  })


});
