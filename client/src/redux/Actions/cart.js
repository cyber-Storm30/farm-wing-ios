export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (data, productId, quantity) => {
  return {
    type: ADD_TO_CART,
    payload: {
      title: data.title,
      subtitle: data.subtitle,
      img: data.img,
      _id: data._id,
      stock: data.stock,
      price: data.price,

      quantity,
    },
  };
};

export const removeFromCart = data => {
  return {
    type: REMOVE_FROM_CART,
    payload: data,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
