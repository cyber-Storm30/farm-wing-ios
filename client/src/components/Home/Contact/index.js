import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../../Navbar';

const Contact = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#141414'}}>
      <Navbar navigation={navigation} />
      <View style={{padding: 20}}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            marginBottom: 10,
          }}>
          For any queries please contact us on the contact info given below
        </Text>
        <Text style={{color: 'white'}}>Phone: +91 9767XXXXXX</Text>
        <Text style={{color: 'white'}}>Email: writetoFarmWing@gmail.com</Text>
      </View>
    </SafeAreaView>
  );
};

export default Contact;
