import { Injectable } from '@angular/core';
import { devices } from '../models/devices';
import { devicesList, tagList } from 'src/data';
import { Tag } from '../models/tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DEVICES_BY_ID_URL,
  DEVICES_BY_SEARCH_URL,
  DEVICES_BY_TAG_URL,
  DEVICES_TAGS_URL,
  DEVICES_URL,
} from '../constants/url';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<devices[]> {
    return this.http.get<devices[]>(DEVICES_URL);
  }

  getAllDevicesBySearchName(deviceName: string) {
    return this.http.get<devices[]>(DEVICES_BY_SEARCH_URL + deviceName);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(DEVICES_TAGS_URL);
  }

  getAllDevicesByTag(deviceTag: string): Observable<devices[]> {
    return deviceTag === 'All'
      ? this.getAll()
      : this.http.get<devices[]>(DEVICES_BY_TAG_URL + deviceTag);
  }

  getDevicesByID(deviceID: string): Observable<devices> {
    return this.http.get<devices>(DEVICES_BY_ID_URL + deviceID);
  }
}
