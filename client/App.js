// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/components/Login';
import Signup from './src/components/Signup';
import Home from './src/components/Home';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const App = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}
        initialRouteName={user && user?._id ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
