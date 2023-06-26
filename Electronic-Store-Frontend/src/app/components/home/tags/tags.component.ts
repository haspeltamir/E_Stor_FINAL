import { Tag } from 'src/app/models/tag';
import { DevicesService } from './../../../services/devices.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent {
  tags?: Tag[];
  constructor(devicesService: DevicesService) {
    devicesService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }
}
