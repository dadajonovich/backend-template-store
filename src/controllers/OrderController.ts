import { RequestHandler } from 'express';
import { OrderCreationDto, OrderDto } from '../view/OrderDto';
import { Order } from '../db/models/Order';

export class OrderController {
  public static add: RequestHandler<void, OrderDto, OrderCreationDto> = async (
    req,
    res,
    next
  ) => {
    try {
      const { name, adress, phone, productIds } = req.body;
      const newOrder = await Order.create({
        name,
        adress,
        phone,
      });

      const products = await newOrder.setProducts(products);

      res.status(200).send({
        id: newOrder.id,
        name: newOrder.name,
        adress: newOrder.adress,
        phone: newOrder.phone,
        status: newOrder.status,
      });
    } catch (error) {
      next(error);
    }
  };
}
