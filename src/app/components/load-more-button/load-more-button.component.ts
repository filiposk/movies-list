import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.scss']
})
export class LoadMoreButtonComponent implements OnInit {
  @Output() onClickEmmiter = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void{
    this.onClickEmmiter.emit();
  }
}


