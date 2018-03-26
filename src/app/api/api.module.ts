import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralDataService } from './general-data.service';
import { FormatConstraintDesignService } from './format-constraint-design.service';
import { ItemDesignService } from './item-design.service';
// import { ResponseService } from './response.service';
import { SequenceDesignService } from './sequence-design.service';
import { AssetDesignService } from './asset-design.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    FormatConstraintDesignService,
    GeneralDataService,
    ItemDesignService,
    SequenceDesignService,
    AssetDesignService
  ],
  exports: [
    // FormatConstraintDesignService,
    // GeneralDataService,
    // ItemDesignService,
    // ResponseService,
    // SequenceDesignService,
    // AssetDesignService
  ]
})
export class ApiModule { }
