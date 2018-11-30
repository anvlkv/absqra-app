import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-array-input-demo',
  templateUrl: './array-input-demo.component.html'
})
export class ArrayInputDemoComponent implements OnInit {
  formGroup: FormGroup;
  value: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      array: this.fb.array(['a', 'b', 'c'])
    });

    this.formGroup.valueChanges.subscribe(v => this.value = v);
  }

}
