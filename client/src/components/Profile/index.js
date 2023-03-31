import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {baseURL} from '../../Services/apiClient';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {useState} from 'react';
import axios from 'axios';
import EditProfileModal from './EditProfileModal';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../redux/Actions/auth';
import {clearCart} from '../../redux/Actions/cart';

const Profile = ({navigation}) => {
  const user = useSelector(state => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [latestOrder, setLatestOrder] = useState({});
  const [latestProduct, setLatestProduct] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  const [userData, setUserData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [isOrder, setIsOrder] = useState(false);

  const [isEditProfile, setIsEditProfile] = useState(false);

  const {width, height} = useWindowDimensions();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigation.navigate('Home');
  };

  useFocusEffect(
    useCallback(() => {
      const getOrder = async () => {
        const {data} = await axios.get(`${baseURL}/order/${user._id}`);
        setIsOrder(data.order.length > 0);
        console.log('%', data);
        setLatestOrder(data.order[0]);
        setLatestProduct(data.order[0].cart[0]);
        setItemCount(data.order[0].cart.length - 1);
      };
      getOrder();
    }, []),
  );

  if (isEditProfile) {
    return (
      <EditProfileModal
        navigation={navigation}
        isEditProfileOpen={isEditProfile}
        setIsEditProfileOpen={setIsEditProfile}
        userId={user._id}
        user={user}
        setCounter={setCounter}
      />
    );
  } else {
    return (
      <TouchableWithoutFeedback
        touchSoundDisabled
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: '#141414',
            paddingHorizontal: 20,
          }}>
          {isLoading ? (
            <View
              style={{
                height: height,
                justifyContent: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 30,
                  fontWeight: '700',
                }}>
                Loading....
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginTop: 10,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 28,
                    fontWeight: '700',
                  }}>
                  Profile
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Back
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    // style={{width: width - 40, backgroundColor: 'white'}}
                    onPress={handleLogout}>
                    <Text
                      style={{
                        color: '#E30B5C',
                        fontSize: 16,
                        fontWeight: '600',
                      }}>
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Image
                style={{width: 60, height: 60, borderRadius: 18, marginTop: 10}}
                source={{
                  uri:
                    user?.image?.length > 0
                      ? user?.image
                      : `https://ui-avatars.com/api/?name=${user.name}&length=1&background=D18700&color=fff&size=64`,
                }}
              />
              <Text
                style={{
                  marginTop: 10,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                Name: {user.name}
              </Text>
              <Text
                style={{
                  marginTop: 12,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                email: {user.email}
              </Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => setIsEditProfile(true)}
            style={{
              marginVertical: 40,
              width: width - 40,
              borderRadius: 6,
              backgroundColor: '#A36A00',
              padding: 10,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          {isOrder && (
            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
              Latest Order
            </Text>
          )}

          {isOrder && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Order')}
                style={{
                  width: width - 40,
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: '#141414',
                  backgroundColor: '#FAF9F6',
                  padding: 10,
                }}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  <Image
                    resizeMode="contain"
                    source={{
                      uri: latestProduct?.img,
                    }}
                    style={{height: 80, width: 80}}
                  />
                  <Text
                    style={{
                      marginLeft: 20,
                      color: 'black',
                      fontSize: 24,
                      fontWeight: '700',
                    }}>
                    {latestProduct?.title} + {itemCount} Other Items
                  </Text>
                </View>
                <Text
                  style={{
                    margin: 10,
                    color: 'black',
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  Total Amount : {latestOrder?.totalAmount}
                </Text>
                <Text
                  style={{
                    margin: 10,
                    color: 'green',
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  Order Status: {latestOrder?.orderStatus}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Order')}
                style={{
                  marginTop: 20,
                  backgroundColor: '#71797E',
                  width: width - 40,
                  borderRadius: 10,
                  alignItems: 'center',
                  padding: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '700',
                  }}>
                  See All Orders
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
};

export default Profile;
