import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Farm } from 'src/app/demo/api/farm';

@Component({
  selector: 'app-farm-details',
  templateUrl: './farm-details.component.html',
  styleUrl: './farm-details.component.scss'
})
export class FarmDetailsComponent implements OnInit,AfterViewInit{
  @Input() selectedItem:Farm
  @Input() farm: Farm[];
  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.selectedItem === undefined || this.selectedItem === null) {
      // Check if farms array is not empty
      if (this.farm && this.farm.length > 0) {
        // Set the last object in the farms array as the default selected item
      }
    }
  }
}
