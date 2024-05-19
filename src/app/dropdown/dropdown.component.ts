import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent implements OnInit {
  @Input() data: any = [
    { name: 'test1', value: 'test1' },
    { name: 'test2', value: 'test2' },
    { name: 'test3', value: 'test3' },
    { name: 'test4', value: 'test4' },
  ];
  @Input() defaultItemIndex = 0;
  @Input() noDefault = true;
  @Output() dropdownValueEvent = new EventEmitter<any>();
  selectedOption: any;
  isDropDownActive = false;
  constructor() {}

  ngOnInit(): void {
    if (!this.noDefault) {
      this.selectedOption = this.data[this.defaultItemIndex];
    }
  }
  changeValue(value: any) {
    this.dropdownValueEvent.emit(value);
  }
}
