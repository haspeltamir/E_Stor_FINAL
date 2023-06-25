import { Router } from "express";
import { usersList } from "../data";
import jwt from "jsonwebtoken";

const userRouter = Router();

userRouter.post("/login", (request, response) => {
  const body = request.body;
  // const { email, password } = request.body;
  const user = usersList.find(
    (user) => user.email === body.email && user.password === body.password
  );

  if (user) {
    response.send(generateTokenResponse(user));
  } else {
    response.status(400).send("user name or password is invalid");
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
export default userRouter;
