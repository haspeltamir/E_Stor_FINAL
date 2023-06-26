import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../../constants/http_status";
import { OrderStatus } from "../../constants/order_status";
import { OrderModel } from "../models/order.model";
import auth from "../middleware/auth.mid";

const router = Router();
router.use(auth);

router.post(
  "/create",
  asyncHandler(async (request: any, response: any) => {
    const requestOrder = request.body;

    if (requestOrder.items.length <= 0) {
      response.status(HTTP_BAD_REQUEST).send("Cart Is Empty!");
      return;
    }

    await OrderModel.deleteOne({
      user: request.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...requestOrder, user: request.user.id });
    await newOrder.save();
    response.send(newOrder);
  })
);

router.get(
  "/track/:id",
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
  })
);

export default router;
