import React from "react";

const OrderListPage = async () => {
  const res = await fetch(`${process.env.BACKEND_URL}/orders`, {
    cache: "no-cache",
  });
  const allOrders = await res.json();
  const orders = allOrders?.data;
  console.log(orders);

  return <div></div>;
};

export default OrderListPage;
