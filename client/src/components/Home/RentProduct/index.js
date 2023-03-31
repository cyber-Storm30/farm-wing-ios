import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
  Modal,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {addToCart, clearCart} from '../../../redux/Actions/cart';
import {useDispatch} from 'react-redux';

const RentProduct = ({item, userId}) => {
  const [isSeeMore, setIsSeeMore] = useState(true);
  const [rentModal, setRentModal] = useState(false);
  const [addedCart, setAddedCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(
    item?.stock > 0 ? true : false,
  );
  console.log('Rent', item);
  const handleAddToCart = async () => {
    setRentModal(true);
  };

  const handleRemoveFromCart = async () => {};

  const {width, height} = useWindowDimensions();

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
        <Modal
          visible={rentModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setRentModal(false)}>
          <SafeAreaView>
            <View
              style={{
                width: width - 40,
                height: 200,
                backgroundColor: '#141414',
                position: 'absolute',
                top: 200,
                left: 20,
                borderRadius: 10,
              }}>
              <View style={{padding: 20}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    marginBottom: 10,
                  }}>
                  Contact Information
                </Text>
                <Text style={{color: 'white'}}>Name: {item.rentInfo.name}</Text>
                <Text style={{color: 'white'}}>
                  Phone: {item.rentInfo.contact}
                </Text>
                <Text style={{color: 'white'}}>
                  Email: {item.rentInfo.email}
                </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    setRentModal(false);
                  }}
                  style={{
                    width: 200,
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: '#A36A00',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Modal>
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
              width: 160,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlignVertical: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: 16,
              }}>
              $ {item.price} / Month
            </Text>
          </TouchableOpacity>
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
          <Text style={{fontSize: 16, color: 'white'}}>Rent Item</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RentProduct;
