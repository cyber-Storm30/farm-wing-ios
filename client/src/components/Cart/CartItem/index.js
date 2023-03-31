import {
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {removeFromCart, addToCart} from '../../../redux/Actions/cart';

const CartItem = ({item}) => {
  console.log(item);
  const {width, height} = useWindowDimensions();
  const [quantity, setQuantity] = useState(item.quantity);
  // const {quantity} = item;

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(addToCart(item, item._id, quantity - 1));
    } else {
      dispatch(removeFromCart(item));
    }
  };
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: 'white',
        height: 200,
        // alignItems: 'center',
        borderRadius: 5,
        marginBottom: 20,
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image source={{uri: item?.img}} style={{width: 100, height: 100}} />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={handleDelete}
            style={{
              backgroundColor: 'black',
              borderRadius: 5,
              width: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>-</Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 16,
              color: 'black',
              marginHorizontal: 5,
              width: 20,
              textAlign: 'center',
            }}>
            {quantity}
          </Text>
          <TouchableOpacity
            onPress={() => {
              if (quantity < item.stock) {
                setQuantity(prev => prev + 1);
                dispatch(addToCart(item, item._id, quantity + 1));
              }
            }}
            style={{
              backgroundColor: 'black',
              borderRadius: 5,
              width: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingTop: 20}}>
        <Text style={{fontSize: 24, color: 'black'}}>{item?.title}</Text>
        <Text style={{color: 'green'}}>In stock</Text>
        <Text>
          <Text style={{color: 'black'}}>Price: </Text>${item?.price}
        </Text>
        <TouchableOpacity onPress={handleRemoveFromCart}>
          <View
            style={{
              width: 70,
              height: 35,
              backgroundColor: '#AEAEAE',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Text style={{color: 'black'}}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
