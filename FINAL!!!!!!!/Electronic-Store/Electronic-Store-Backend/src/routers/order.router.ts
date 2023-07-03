import { Router } from "express";
import asyncHandler from "express-async-handler";
import { HTTP_BAD_REQUEST } from "../../constants/http_status";
import { OrderStatus } from "../../constants/order_status";
import { Order,OrderModel } from "../models/order.model";

const router = Router();


router.post('/create',
asyncHandler(async (req:any, res:any) => {
    const requestOrder = req.body;
    console.log(requestOrder)
    if(requestOrder.items.length <= 0){
        res.status(HTTP_BAD_REQUEST).send('Cart Is Empty!');
        return;
    }   
    const newOrder: Order = {
        id: req.body.id,
        items: req.body.items,
        totalPrice: req.body.totalPrice,
        name: req.body.name,
        address: req.body.address,
        paymentId: req.body.paymentId,
        status: req.body.status,
        createdAt: ""
    };
    const dbOrder = await OrderModel.create(newOrder);
    res.send(dbOrder);
})
)


router.get('/newOrderForCurrentUser', asyncHandler( async (req:any,res ) => {
    const order= await getNewOrderForCurrentUser(req);
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}))

router.post('/pay', asyncHandler( async (req:any, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))

router.get('/track/:id', asyncHandler( async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}

