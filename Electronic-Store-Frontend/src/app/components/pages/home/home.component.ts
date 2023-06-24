import { tagList } from './../../../../data';
import { DevicesService } from './../../../services/devices.service';
import { devices } from 'src/app/models/devices';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  devices:devices[]=[];
  constructor(private devicesService:DevicesService,activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params)=>
    {
      if(params.searchName)
      this.devices = this.devicesService.getAllDevicesBySearchName(params.searchName);
      else if(params.tag)
        this.devices = this.devicesService.getAllDevicesByTag(params.tagList);
      else
        this.devices = this.devicesService.getAll();
    });
    this.devices=devicesService.getAll();
  }
}
