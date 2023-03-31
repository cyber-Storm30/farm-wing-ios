import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Shop from './Shop';
import Rent from './Rent';
import Sell from './Sell';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Image, Text, View} from 'react-native';
import DotIcon from 'react-native-vector-icons/Entypo';
import Navbar from '../Navbar';
import Cart from '../Cart';
import Order from './Order';
import Profile from '../Profile';
import {useSelector} from 'react-redux';
import Contact from './Contact';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    if (!user?._id) {
      navigation.navigate('Login');
    }
  }, [user]);

  return (
    <NavigationContainer independent={true}>
      {/* <Navbar navigation={navigation} /> */}
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          animation: 'slide_from_right',
          tabBarStyle: {
            backgroundColor: '#141414',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        }}
        initialRouteName={'Shop'}>
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <View>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={{
                    uri: 'https://i.pinimg.com/736x/95/67/ba/9567bac44b90867dc730858c2c528f01.jpg',
                  }}
                /> */}
                <Text style={{color: 'white'}}>Buy</Text>
              </View>
            ),
          }}
          name="Shop"
          component={Shop}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <View>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={{
                    uri: 'https://i.pinimg.com/736x/95/67/ba/9567bac44b90867dc730858c2c528f01.jpg',
                  }}
                /> */}
                <Text style={{color: 'white'}}>Sell</Text>
              </View>
            ),
          }}
          name="Sell"
          component={Sell}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <View>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={{
                    uri: 'https://i.pinimg.com/736x/95/67/ba/9567bac44b90867dc730858c2c528f01.jpg',
                  }}
                /> */}
                <Text style={{color: 'white'}}>Rent</Text>
              </View>
            ),
          }}
          name="Rent"
          component={Rent}
        />
        <Tab.Screen
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            tabBarStyle: {display: 'none'},
          }}
          name="Cart"
          component={Cart}
        />
        <Tab.Screen
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            tabBarStyle: {display: 'none'},
          }}
          name="Profile"
          component={Profile}
        />
        <Tab.Screen
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
            tabBarStyle: {display: 'none'},
          }}
          name="Order"
          component={Order}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({color, size}) => (
              <View>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={{
                    uri: 'https://i.pinimg.com/736x/95/67/ba/9567bac44b90867dc730858c2c528f01.jpg',
                  }}
                /> */}
                <Text style={{color: 'white'}}>Contact</Text>
              </View>
            ),
          }}
          name="Contact"
          component={Contact}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Home;
