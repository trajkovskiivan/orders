import {
  ORDERS_FETCHING,
  ORDERS_FETCH_FAIL,
  ORDERS_FETCH_SUCCESS,
} from "../actionTypes";

const INITIAL_STATE = {
  fetching: false,
  fetched: false,
  data: [],
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ORDERS_FETCHING:
      return { ...state, fetching: true };
    case ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        fetching: false,
        fetched: true,
      };
    case ORDERS_FETCH_FAIL:
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: action.payload,
      };
    default:
      return state;
  }
};
