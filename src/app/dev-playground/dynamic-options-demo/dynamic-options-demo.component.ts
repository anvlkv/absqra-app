import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-options-demo',
  templateUrl: './dynamic-options-demo.component.html',
  styleUrls: ['dynamic-options-demo.component.scss']
})
export class DynamicOptionsDemoComponent implements OnInit {
  formGroup: FormGroup;
  value: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      options: this.fb.array(['a', 'b', 'c', 'd', 'e', 'f', 'g']),
      multiple: this.fb.array(['a', 'b', 'c'])
    });
  }

}
