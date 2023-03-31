import OrderModel from "../models/order.js";

export const createOrder = async (req, res) => {
  const { user, totalAmount, orderAddress, cart } = req.body;
  console.log(req.body);
  try {
    const order = await OrderModel.create({
      user,
      cart,
      orderAddress,
      totalAmount,
    });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserOrderById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const order = await OrderModel.find({ user: id })
      .sort({ createdAt: -1 })
      .populate({
        path: "cart",
        populate: "product",
      });
    res.json({ status: 200, order });
  } catch (err) {
    res.json({ status: 500, message: "Something went wrong", err });
  }
};

var val1 = 20;

function fun() {
  console.log(val1);
  var val1 = 10;
}

fun();
