import axios from "axios";
import {
  ORDERS_FETCHING,
  ORDERS_FETCH_FAIL,
  ORDERS_FETCH_SUCCESS,
} from "../actionTypes";
import apiEndpints from "../../constants/apiEndpints";

export const fetchOrders = () => async (dispatch) => {
  dispatch({ type: ORDERS_FETCHING });
  try {
    const response = await axios.get(apiEndpints.FETCH_ORDERS);
    if (response?.status === 200 && response?.data) {
      dispatch({
        type: ORDERS_FETCH_SUCCESS,
        payload: response?.data,
      });
    } else {
      dispatch({
        type: ORDERS_FETCH_FAIL,
        payload: `Response failed with status code ${response?.status}`,
      });
    }
  } catch (e) {
    dispatch({
      type: ORDERS_FETCH_FAIL,
      payload: `Response failed with status code ${e.response?.status}`,
    });
    return Promise.reject(e.response);
  }
};
