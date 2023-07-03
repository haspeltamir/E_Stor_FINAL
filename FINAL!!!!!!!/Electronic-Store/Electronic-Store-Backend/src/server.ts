import dotenv from "dotenv";
dotenv.config();
// process.env.MONGO_URI;

import express from "express";
import cors from "cors";
import deviceRouter from "./routers/device.router";
import userRouter from "./routers/user.router";
import { dbConnect } from "./configs/database.config";
import orderRouter from "./routers/order.router";
dbConnect();
const port = 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

//router middleware
app.use("/api/devices", deviceRouter);

//users middleware
app.use("/api/users", userRouter);

//orders middleware
app.use("/api/orders", orderRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
