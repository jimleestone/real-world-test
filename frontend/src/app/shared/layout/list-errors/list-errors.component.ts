import { Component, Input, OnInit } from '@angular/core';

import { Errors } from 'src/app/core';

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.css'],
})
export class ListErrorsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {}).map(
      (key) => `${key} ${errorList.errors[key]}`
    );
  }

  get errorList() {
    return this.formattedErrors;
  }
}
