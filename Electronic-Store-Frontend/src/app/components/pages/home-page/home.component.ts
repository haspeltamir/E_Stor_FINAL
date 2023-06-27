import { tagList } from '../../../../data';
import { DevicesService } from '../../../services/devices.service';
import { devices } from 'src/app/models/devices';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  devices: devices[] = [];
  constructor(
    private devicesService: DevicesService,
    activatedRoute: ActivatedRoute
  ) {
    let devicesObservable: Observable<devices[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchName)
        devicesObservable = this.devicesService.getAllDevicesBySearchName(
          params.searchName
        );
      else if (params.deviceTag)
        devicesObservable = this.devicesService.getAllDevicesByTag(
          params.deviceTag
        );
      else {
        devicesObservable = devicesService.getAll();
      }
      devicesObservable.subscribe((serverDevices) => {
        this.devices = serverDevices;
      });
    });

  }
}
