import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '../../../api/response.service';
import { Step } from '../../../../models/Step';
import { FormConfig, FormsSchemaService } from '../../../core-forms/forms-schema.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-response',
  templateUrl: './step-response.component.html',
  styleUrls: ['./step-response.component.scss']
})
export class StepResponseComponent implements OnInit {
  step: Step;
  response: FormGroup;
  config: FormConfig;

  constructor(
    private rs: ResponseService,
    private fs: FormsSchemaService
  ) { }

  ngOnInit() {
    this.rs.getStep().subscribe(s => {
      this.step = s;
      if (this.step.item) {
        this.fs.questionnaire = this.step.item;
      }
    });

    this.fs.getFg().subscribe((responseForm) => {
      this.response = responseForm;
    });

    this.fs.getConfig().subscribe((config) => {
      this.config = config;
    });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.response.valid) {
      this.rs.saveStepResponse(this.response.getRawValue(), this.config).subscribe((result) => {
        if (result) {
          this.rs.nextStep().subscribe(s => this.step = s);
        }
      });
    }
  }
}
