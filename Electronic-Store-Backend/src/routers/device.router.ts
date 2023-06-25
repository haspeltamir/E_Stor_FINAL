import { Router } from "express";
import { devicesList, tagList } from "../data";
const deviceRouter = Router();
import asyncHandler from "express-async-handler";
import { DeviceModel } from "../models/device.model";

deviceRouter.get(
  "/seed",
  asyncHandler(async (request, response) => {
    const deviceCount = await DeviceModel.countDocuments();
    if (deviceCount > 0) {
      response.send("seed is already done!");
      return;
    }
    await DeviceModel.create(devicesList);
    response.send("Seed is done");
  })
);

deviceRouter.get(
  "/",
  asyncHandler(async (request, response) => {
    const devices = await DeviceModel.find();
    response.send(devicesList);
  })
);

// deviceRouter.get("/", async (request, response) => {
//   const devices = await DeviceModel.find();
//   response.send(devicesList);
// });

//Search BY Name
// deviceRouter.get("/search/:searchName", (request, response) => {
//   const searchName = request.params.searchName;
//   const devices = devicesList.filter((deviceName) =>
//     deviceName.name.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())
//   );
//   response.send(devices);
// });

deviceRouter.get(
  "/search/:searchName",
  asyncHandler(async (request, response) => {
    const searchRegex = new RegExp(request.params.searchName, "i");
    const devices = await DeviceModel.find({ name: { $regex: searchRegex } });
    response.send(devices);
  })
);

//Get All tags
// deviceRouter.get("/tags", (request, response) => {
//   response.send(tagList);
// });

deviceRouter.get(
  "/tags",
  asyncHandler(async (request, response) => {
    const tags = await DeviceModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          count: "$count",
        },
      },
    ]).sort({ count: -1 }); //-1 decending order

    const all = {
      name: "All",
      count: await DeviceModel.countDocuments(),
    };

    tags.unshift(all);
    response.send(tags);
  })
);

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
