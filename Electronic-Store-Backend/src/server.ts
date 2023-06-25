import express, { request, response } from "express";
import cors from "cors";
import { devicesList, tagList, usersList } from "./data";
import jwt from "jsonwebtoken";
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

app.post("/api/users/login", (request, response) => {
  const body = request.body;
  // const { email, password } = request.body;
  const user = usersList.find(
    (user) => user.email === body.email && user.password === body.password
  );

  if (user) {
    response.send(generateTokenResponse(user));
  } else {
    response.status(400).send("user name or password ");
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    "password",
    { expiresIn: "7d" }
  );
  user.token = token;
  return user;
};

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
