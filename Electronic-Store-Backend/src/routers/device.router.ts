import { Router } from "express";
import { devicesList, tagList } from "../data";
const deviceRouter = Router();
import asynceHandler from "express-async-handler";
import { DeviceModel } from "../models/device.model";

deviceRouter.get(
  "/seed",
  asynceHandler(async (request, response) => {
    const deviceCount = await DeviceModel.countDocuments();
    if (deviceCount > 0) {
      response.send("seed is already done!");
      return;
    }
    await DeviceModel.create(devicesList);
    response.send("Seed is done");
  })
);

deviceRouter.get("/", (request, response) => {
  response.send(devicesList);
});

//Search BY Name
deviceRouter.get("/search/:searchName", (request, response) => {
  const searchName = request.params.searchName;
  const devices = devicesList.filter((deviceName) =>
    deviceName.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
  );
  response.send(devices);
});

//Get All tags
deviceRouter.get("/tags", (request, response) => {
  response.send(tagList);
});

//Get Devices by tags
deviceRouter.get("/tag/:tagName", (request, response) => {
  const deviceTag = request.params.tagName;
  const devices = devicesList.filter((device) =>
    device.tags?.includes(deviceTag)
  );
  response.send(devices);
});

//Get Devices by ID
deviceRouter.get("/:deviceID", (request, response) => {
  const deviceID = request.params.deviceID;
  const device = devicesList.find((device) => device.id === deviceID);
  response.send(device);
});

export default deviceRouter;
