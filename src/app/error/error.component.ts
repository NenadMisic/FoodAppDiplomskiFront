import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnChanges {

  @Input() open: boolean;
  @Input() error: string;
  @Output() openChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.error.includes('Wrong password')) {
      this.error = 'Wrong password!';
    }

  }

  close() {
    this.open = false;
    this.openChanged.emit(this.open);
  }

}
