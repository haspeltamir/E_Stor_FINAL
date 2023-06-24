import { Injectable } from '@angular/core';
import { devices } from '../models/devices';
import { devicesList, tagList } from 'src/data';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  constructor() { }

  getAll():devices[]{
    return devicesList;
  }
  getAllDevicesBySearchName(deviceName: string):devices[] {
    return this.getAll()
  .filter(device => device.name.toLocaleLowerCase().includes(deviceName.toLocaleLowerCase()));
  }
  getDevicesByID(deviceID: string):devices {
    const foundDevice = this.getAll().find(device => device.id === deviceID);
    if (foundDevice) {
      return foundDevice;
    } 
    else {
      return new devices();
    }
  }

  getAllTags():Tag[]{
    return tagList;
  }

  getAllDevicesByTag(deviceTag:string):devices[]{
    if (deviceTag == 'All')
      return this.getAll();
    return this.getAll()
  .filter(device => device.tags?.includes(deviceTag));
  }
  
}
