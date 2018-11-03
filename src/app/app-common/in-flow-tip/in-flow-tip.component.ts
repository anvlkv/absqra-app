import { Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LocalStorageService } from '../local-storage-service/local-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-in-flow-tip',
  templateUrl: './in-flow-tip.component.html',
  styleUrls: ['./in-flow-tip.component.scss']
})
export class InFlowTipComponent implements OnInit, OnChanges {
  @Input()
  name: string;

  @Input()
  hidden: boolean;

  @Input()
  expandAnchor: HTMLElement;

  @Input()
  persistent = true;

  presence: Observable<boolean>;

  get tooltipName (): string {
    return `tooltipState-${this.name}`
  }



  constructor(
    private ls: LocalStorageService,
    private el: ElementRef<HTMLElement>,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.hidden = this.hidden || this.ls.getItem(this.tooltipName);
    this.hidden ? this.hide() : this.show();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.expandAnchor && changes.expandAnchor.currentValue) {
      this.expandAnchor.onclick = (e) => {
        this.show(e);
      }
    }
  }

  hide(evt?) {
    evt ? evt.preventDefault() : null;
    this.hidden = true;
    this.ls.setItem(this.tooltipName, true);
    if (this.expandAnchor) {
      this.expandAnchor.hidden = false;
    }
  }

  show(evt?) {
    evt ? evt.preventDefault() : null;
    this.hidden = false;
    if (this.expandAnchor) {
      this.expandAnchor.hidden = true;
    }

    if (evt) {
      this.zone.runOutsideAngular(() => {
        requestAnimationFrame(() => {
          this.el.nativeElement.querySelector('.tooltip-card') .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
        });
      });
    }
  }

}
