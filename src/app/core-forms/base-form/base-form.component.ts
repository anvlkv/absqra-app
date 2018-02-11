import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormConfig, FormsSchemaService } from '../forms-schema.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent implements OnInit {
  config: FormConfig;
  form: FormGroup;

  constructor(
    private fsc: FormsSchemaService
  ) { }

  ngOnInit() {
    this.fsc.getConfig().subscribe(config => {
      this.fsc.getFg().subscribe(fg => {
        this.config = config;
        this.form = fg;
      });
    });
  }

}
