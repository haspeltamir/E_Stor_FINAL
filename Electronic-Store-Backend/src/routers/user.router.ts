import { Router } from "express";
import { usersList } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
const router = Router();

router.get(
  "/seed",
  asyncHandler(async (request, response) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
      response.send("seed is already done!");
      return;
    }
    await UserModel.create(usersList);
    response.send("Seed is done");
  })
);

router.post(
  "/login",
  asyncHandler(async (request, response) => {
    // const body = request.body;
    const email = request.body.email;
    const password = request.body.password;
    const user = await UserModel.findOne({ email, password });

    if (user) {
      // if (user && (await bcrypt.compare(password, user.password))) {
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
export default router;
