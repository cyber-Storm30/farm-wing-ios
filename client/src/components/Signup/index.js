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

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigation.navigate('Login');
  };

  const handleSignUp = async () => {
    if (password === confirmPassword) {
      try {
        const res = await axios.post(`${baseURL}/user/signup`, {
          name,
          image: '',
          email,
          password,
        });
        console.log(res);
        dispatch(setUser(res.data));
        res.status === 200 && navigation.navigate('Home');
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Wrong Password');
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
              setName(val);
            }}
            style={{color: 'white'}}
            placeholder="Enter your name"
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
            marginBottom: 10,
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
              setConfirmPassword(val);
            }}
            style={{color: 'white'}}
            placeholder="Re-enter your password"
            placeholderTextColor="white"
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity
          onPress={handleSignUp}
          style={{
            width: 300,
            height: 50,
            borderRadius: 5,
            backgroundColor: '#754C00',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Signup</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{color: 'white', marginRight: 10}}>Already a user?</Text>
          <TouchableWithoutFeedback onPress={handleNavigate}>
            <Text style={{color: '#FFC55C'}}>Login</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
