import { GET_POSTS, SET_POSTS } from "../Actions/products";

const initialState = {
  isFetching: false,
  products: [],
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS: {
      return {
        isFetching: true,
        products: [],
      };
    }
    case SET_POSTS: {
      return {
        isFetching: false,
        products: action.payload,
      };
    }
    default:
      return state;
  }
};
