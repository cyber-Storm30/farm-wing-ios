import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {baseURL} from '../../Services/apiClient';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/Actions/auth';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigation.navigate('Signup');
  };

  const handleLogin = async () => {
    try {
      const {data} = await axios.post(`${baseURL}/user/login`, {
        email,
        password,
      });
      console.log(data);
      dispatch(setUser(data));
      data?._id && navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#141414'}}>
      <View>
        <Text
          style={{
            color: 'white',
            fontSize: 28,
            marginTop: 20,
            textAlign: 'center',
          }}>
          FARM-WING
        </Text>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#3B3B3B',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 10,
          }}>
          <TextInput
            onChangeText={val => {
              setEmail(val);
            }}
            style={{color: 'white'}}
            placeholder="Enter your email"
            placeholderTextColor="white"
          />
        </View>
        <View
          style={{
            width: 300,
            height: 50,
            backgroundColor: '#3B3B3B',
            paddingHorizontal: 10,
            justifyContent: 'center',
            borderRadius: 5,
            marginBottom: 30,
          }}>
          <TextInput
            onChangeText={val => {
              setPassword(val);
            }}
            style={{color: 'white'}}
            placeholder="Enter your password"
            placeholderTextColor="white"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            width: 300,
            height: 50,
            borderRadius: 5,
            backgroundColor: '#754C00',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Login</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{color: 'white', marginRight: 10}}>New here?</Text>
          <TouchableWithoutFeedback onPress={handleNavigate}>
            <Text style={{color: '#FFC55C'}}>Signup</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
