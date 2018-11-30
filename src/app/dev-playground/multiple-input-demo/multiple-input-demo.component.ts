import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiple-input-demo',
  templateUrl: './multiple-input-demo.component.html',
})
export class MultipleInputDemoComponent implements OnInit {

  formGroup: FormGroup;
  value: any;
  options: string[];

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      multiple: this.fb.array(['a', 'b', 'c'])
    });

    this.options = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];


    this.formGroup.valueChanges.subscribe(v => this.value = v);
  }

}
