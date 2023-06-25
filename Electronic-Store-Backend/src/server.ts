import express, { request, response } from "express";
import cors from "cors";
import { devicesList, tagList } from "./data";
const port = 3000;

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.get("/api/devices", (request, response) => {
  response.send(devicesList);
});

//Search BY Name
app.get("/api/devices/search/:searchName", (request, response) => {
  const searchName = request.params.searchName;
  const devices = devicesList.filter((deviceName) =>
    deviceName.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
  );
  response.send(devices);
});

//Get All tags
app.get("/api/devices/tags", (request, response) => {
  response.send(tagList);
});

//Get Devices by tags
app.get("/api/devices/tag/:tagName", (request, response) => {
  const deviceTag = request.params.tagName;
  const devices = devicesList.filter((device) =>
    device.tags?.includes(deviceTag)
  );
  response.send(devices);
});

//Get Devices by ID
app.get("/api/devices/:deviceID", (request, response) => {
  const deviceID = request.params.deviceID;
  const device = devicesList.find((device) => device.id === deviceID);
  response.send(device);
});
/*
  getAllDevicesBySearchName(deviceName: string): devices[] {
    return this.getAll().filter((device) =>
      device.name.toLocaleLowerCase().includes(deviceName.toLocaleLowerCase())
    );
  }
  getDevicesByID(deviceID: string): devices {
    const foundDevice = this.getAll().find((device) => device.id === deviceID);
    if (foundDevice) {
      return foundDevice;
    } else {
      return new devices();
    }
  }

  getAllTags(): Tag[] {
    return tagList;
  }

  getAllDevicesByTag(deviceTag: string): devices[] {
    return deviceTag == 'All'
      ? this.getAll()
      : this.getAll().filter((device) => device.tags?.includes(deviceTag));
  }
*/

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
