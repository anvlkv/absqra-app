import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MockDataService } from '../mock-data.service';
import { SequenceService } from './sequence.service';

@Injectable()
export class ResponseService {
  private subjectSequenceResponse = new Subject<any>();
  private activeSequenceResponse: any;

  sequenceResponse$ = this.subjectSequenceResponse.asObservable();

  constructor(
    // private dataService: MockDataService,
    // private sequenceService: SequenceService
  ) {
    this.sequenceResponse$.subscribe(s => {
      this.activeSequenceResponse = s;
    });
  }

  addItemResponse(response: any) {

    const items = this.activeSequenceResponse.items.concat([response]);

    this.setResponse({
      ...this.activeSequenceResponse,
      items
    });
  }

  setResponse(r: any) {
    this.subjectSequenceResponse.next(r);
  }

  nextItem(id: string) {
    // const currentItemId = this.activeSequenceResponse.itemsIds.indexOf(_id);
    //
    // if (currentItemId >= 0 && this.activeSequenceResponse.itemsIds[currentItemId + 1])  {
    //   return this.router.navigate(['answer', this.activeSequenceResponse._id, this.activeSequenceResponse.itemsIds[currentItemId + 1]]);
    // }
  }

}
