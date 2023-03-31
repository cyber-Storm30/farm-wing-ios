import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART} from '../Actions/cart';

const intitialState = {
  cart: [],
};

export const cartReducer = (state = intitialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const item = action.payload;
      console.log(item);
      const existItem = state?.cart?.find(x => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cart: state.cart.map(x => (x._id === existItem._id ? item : x)),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    }
    case REMOVE_FROM_CART:
      const item = action.payload;
      console.log(item);
      const newItemArray = state.cart.filter(x => x._id !== item._id);
      console.log(newItemArray);
      return {
        ...state,
        cart: newItemArray,
      };
    case CLEAR_CART: {
      return intitialState;
    }
    default:
      return state;
  }
};
