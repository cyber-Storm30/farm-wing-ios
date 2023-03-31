import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {addToCart, clearCart} from '../../../redux/Actions/cart';
import {useDispatch} from 'react-redux';

// import axios from 'axios';
// import {baseURL} from '../../../../services/index';

const Product = ({item, userId}) => {
  const [isSeeMore, setIsSeeMore] = useState(true);
  const [addedCart, setAddedCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(
    item?.stock > 0 ? true : false,
  );
  // const {userId} = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    if (item?.stock > 0) dispatch(addToCart(item, item._id, quantity));
    dispatch(addToCart(item, item._id, quantity));
  };

  const handleRemoveFromCart = async () => {};

  const {width} = useWindowDimensions();

  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          marginTop: 20,
          borderWidth: 1,
          borderRadius: 5,
          borderColor: '#141414',
          backgroundColor: '#FAF9F6',
          padding: 10,
          width: width - 30,
        }}>
        <Text
          style={{
            color: 'black',
            fontWeight: '700',
            fontSize: 16,
            marginBottom: 10,
          }}>
          {item.name}
        </Text>
        <Image
          resizeMode="contain"
          style={{height: 150}}
          source={{uri: item?.img}}
        />
        {isSeeMore ? (
          <Text
            style={{
              color: '#333333',
              fontWeight: '500',
              fontSize: 14,
              marginTop: 10,
            }}>
            {item?.desc.slice(0, 80)}
            {item?.desc.length > 80 && (
              <>
                {isSeeMore && (
                  <Text
                    onPress={() => setIsSeeMore(!isSeeMore)}
                    style={{fontSize: 14, color: 'grey'}}>
                    ... See More
                  </Text>
                )}
              </>
            )}
          </Text>
        ) : (
          <Text
            style={{
              color: '#333333',
              fontWeight: '500',
              fontSize: 14,
              marginTop: 10,
            }}>
            {item.desc}
          </Text>
        )}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              marginTop: 20,
              paddingHorizontal: 15,
              paddingVertical: 10,
              backgroundColor: 'black',
              borderRadius: 40,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'gray',
                fontWeight: '700',
                fontSize: 14,
                marginRight: 10,
                textDecorationLine: 'line-through',
              }}>
              ${item.price + 5}
            </Text>
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
              }}>
              ${item.price}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (quantity > 1) {
                  setQuantity(prev => prev - 1);
                }
              }}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: 'black',
                borderRadius: 10,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>-</Text>
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
                }
              }}
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: 'black',
                borderRadius: 10,
                width: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 20, color: 'white'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleAddToCart}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: '#A36A00',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 16, color: 'white'}}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Product;
