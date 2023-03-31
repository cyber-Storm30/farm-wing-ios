import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import Navbar from '../Navbar';
import Address from '../Home/Address';
import CartItem from './CartItem';

const Cart = ({navigation}) => {
  const cart = useSelector(state => state.cart.cart);
  const userId = useSelector(state => state.auth.user._id);
  const [isAddressModal, setIsAddressModal] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    let amount = 0;
    cart.map((data, idx) => {
      amount += data.price * data.quantity;
    });

    setTotalAmount(amount);
    setIsAddressModal(true);
  };

  const renderItem = ({item, index}) => {
    return <CartItem item={item} />;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Navbar navigation={navigation} />
      {isAddressModal ? (
        <Address
          isAddressOpen={isAddressModal}
          setIsAddressOpen={setIsAddressModal}
          userId={userId}
          cart={cart}
          totalAmount={totalAmount}
          navigation={navigation}
        />
      ) : (
        <>
          <View
            style={{
              backgroundColor: '#141414',
              paddingLeft: 10,
              paddingTop: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Shop');
              }}>
              <Text style={{color: 'white'}}>Back</Text>
            </TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#141414', flex: 1, padding: 20}}>
            {cart.length > 0 ? (
              <>
                <FlatList data={cart} renderItem={renderItem} />
                <TouchableOpacity
                  onPress={handleOpenModal}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    backgroundColor: '#A36A00',
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Text style={{fontSize: 16, color: 'white'}}>Continue</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'white'}}>Empty cart</Text>
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Cart;
