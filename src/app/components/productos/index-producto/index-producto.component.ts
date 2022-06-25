import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {

  public load_data = true;

  constructor() { }

  ngOnInit(): void {
  }

}
