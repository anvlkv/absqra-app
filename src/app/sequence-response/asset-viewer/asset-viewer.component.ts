import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AssetBase } from 'models/api-models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-asset-viewer',
  templateUrl: './asset-viewer.component.html',
  styleUrls: ['./asset-viewer.component.scss']
})
export class AssetViewerComponent implements OnInit, OnChanges {

  @Input()
  asset: AssetBase;

  trustedContent: SafeHtml;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.asset.currentValue) {
      this.trustedContent = this.sanitizer.bypassSecurityTrustHtml(this.asset.content);
    }
  }

}
