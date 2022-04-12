import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useStateHook = () => {
  const state = useSelector((state) => state);
  return state;
};

export const useOrders = () => {
  const orders = useSelector((state) => state.orders);
  return orders;
};
