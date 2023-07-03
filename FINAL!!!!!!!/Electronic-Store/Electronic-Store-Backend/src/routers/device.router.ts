import { Router } from "express";
import { devicesList, tagList } from "../data";
import asyncHandler from "express-async-handler";
import { DeviceModel } from "../models/device.model";

const router = Router();

router.get(
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


router.get(
  "/",
  asyncHandler(async (request, response) => {
    const devices = await DeviceModel.find();
    response.send(devices);
  })
);

router.get(
  "/search/:searchName",
  asyncHandler(async (request, response) => {
    const searchRegex = new RegExp(request.params.searchName, "i");
    const devices = await DeviceModel.find({ name: { $regex: searchRegex } });
    response.send(devices);
  })
);

router.get(
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
router.get(
  "/tag/:tagName",
  asyncHandler(async (request, response) => {
    const devices = await DeviceModel.find({ tags: request.params.tagName });
    response.send(devices);
  })
);


router.get(
  "/:deviceID",
  asyncHandler(async (request, response) => {
    const device = await DeviceModel.findById(request.params.deviceID);
    response.send(device);
  })
);

export default router;
