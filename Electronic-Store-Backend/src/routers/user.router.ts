import { Router } from "express";
import { usersList } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";

const userRouter = Router();

userRouter.get(
  "/seed",
  asyncHandler(async (request, response) => {
    const userCount = await UserModel.countDocuments();
    if (userCount > 0) {
      response.send("seed is already done!");
      return;
    }
    await UserModel.create(usersList);
    response.send("Seed is done");
  })
);

userRouter.post(
  "/login",
  asyncHandler(async (request, response) => {
    // const body = request.body;
    const { email, password } = request.body;
    const user = await UserModel.findOne({ email, password });

    if (user) {
      response.send(generateTokenResponse(user));
    } else {
      response.status(400).send("user name or password is invalid");
    }
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    "password",
    { expiresIn: "7d" }
  );
  user.token = token;
  return user;
};
export default userRouter;
