import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/Actions/auth';
import Cart from '../../../assets/cart.png';

const Navbar = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    // dispatch(logout());
    navigation.navigate('Profile');
  };

  return (
    <SafeAreaView>
      <View
        style={{
          paddingHorizontal: 10,
          flexDirection: 'row',
          height: 40,
          justifyContent: 'space-between',
          backgroundColor: '#363638',
          alignItems: 'center',
        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Shop');
          }}>
          <Text style={{color: 'white'}}>Farm-Wing</Text>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            {/* <Icon name="shoppingcart" size={20} color="white" /> */}
            <Image source={Cart} style={{width: 20, height: 20}} />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleLogout}>
            <Image
              style={{width: 20, height: 20, borderRadius: 18, marginLeft: 5}}
              source={{
                uri:
                  user.image?.length > 0
                    ? user.image
                    : `https://ui-avatars.com/api/?name=${user.name}&length=1&background=A36A00&color=fff&size=64`,
              }}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Navbar;
