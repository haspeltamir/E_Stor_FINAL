import { Router } from "express";
import { usersList } from "../data";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User, UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import { HTTP_BAD_REQUEST } from "../../constants/http_status";
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
    // const user = usersList.find(
    // (user) => user.email === email && user.password === password
    // );

    if (user) {
      // if (user && (await bcrypt.compare(password, user.password))) {
      response.send(generateTokenResponse(user));
    } else {
      // const BAD_REQUEST = 400;
      response
        .status(HTTP_BAD_REQUEST)
        .send("user name or password is invalid");
    }
  })
);

router.post(
  "/register",
  asyncHandler(async (request, response) => {
    const { name, email, password, address } = request.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      response.status(HTTP_BAD_REQUEST).send("user already exist,please login");
      return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: "",
      name: name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
    };
    const dbUser = await UserModel.create(newUser);
    response.send(generateTokenResponse(dbUser));
  })
);

const generateTokenResponse = (user: any) => {
  const token = jwt.sign(
    { email: user.email, isAdmin: user.isAdmin },
    "password",
    { expiresIn: "7d" }
  );

  // const generateTokenResponse = (user: User) => {
  //   const token = jwt.sign(
  //     {
  //       id: user.id,
  //       email: user.email,
  //       isAdmin: user.isAdmin,
  //     },
  //     process.env.JWT_SECRET!,
  //     {
  //       expiresIn: "30d",
  //     }
  //   );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
  // user.token = token;
  // return user;
};
export default router;
