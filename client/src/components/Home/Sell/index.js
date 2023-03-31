import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import Navbar from '../../Navbar/index';
import Input from '../../Input/index';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
import CheckBox from '@react-native-community/checkbox';

const Sell = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [isRent, setIsRent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const {width, height} = useWindowDimensions();

  const handleUploadProduct = async () => {
    if (!isRent) {
      if ((title, desc, image, price, stock)) {
        try {
          const res = await axios.post(`${baseURL}/product/create`, {
            title,
            subtitle: title,
            desc,
            img: image,
            price: parseInt(price),
            stock,
            onRent: false,
          });
          if (res.status === 200) {
            navigation.navigate('Shop');
          }
          // console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      if ((title, desc, image, price, stock, name, email, phone)) {
        try {
          const res = await axios.post(`${baseURL}/product/create`, {
            title,
            subtitle: title,
            desc,
            img: image,
            price: parseInt(price),
            stock,
            onRent: true,
            rentInfo: {
              name,
              contact: phone,
              email,
            },
          });
          if (res.status === 200) {
            navigation.navigate('Shop');
          }
          // console.log(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#141414'}}>
      <Navbar navigation={navigation} />
      <ScrollView
        style={{
          backgroundColor: '#141414',
          flex: 1,
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}>
        <Text style={{color: 'white', fontSize: 18}}>Sell your products</Text>
        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: 20}}>
            <Input
              heading="Title"
              placeholder="Enter product title"
              onChange={val => {
                setTitle(val);
              }}
              value={title}
              required
            />
          </View>
          <View style={{marginTop: 20}}>
            <Input
              heading="Description"
              placeholder="Enter product description"
              onChange={val => {
                setDesc(val);
              }}
              value={desc}
              required
            />
          </View>
          <View style={{marginTop: 20}}>
            <Input
              heading="Image"
              placeholder="Enter product image url"
              onChange={val => {
                setImage(val);
              }}
              value={image}
              required
            />
          </View>
          <View style={{marginTop: 20}}>
            <Input
              heading="Price"
              placeholder="Enter product price in dollars"
              onChange={val => {
                setPrice(val);
              }}
              value={price}
              required
            />
          </View>
          <View style={{marginTop: 20}}>
            <Input
              heading="Stock"
              placeholder="Enter product stock"
              onChange={val => {
                setStock(val);
              }}
              value={stock}
              required
            />
          </View>
          {isRent && (
            <View style={{marginTop: 20}}>
              <Input
                heading="Name"
                placeholder="Enter your name"
                onChange={val => {
                  setName(val);
                }}
                value={name}
                required
              />
            </View>
          )}
          {isRent && (
            <View style={{marginTop: 20}}>
              <Input
                heading="Email"
                placeholder="Enter your email"
                onChange={val => {
                  setEmail(val);
                }}
                value={email}
                required
              />
            </View>
          )}
          {isRent && (
            <View style={{marginTop: 20}}>
              <Input
                heading="Contact Number"
                placeholder="Enter your contact number"
                onChange={val => {
                  setPhone(val);
                }}
                value={phone}
                required
              />
            </View>
          )}
          <View
            style={{
              width: width,
              marginTop: 24,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
              marginLeft: 25,
            }}>
            <CheckBox
              value={isRent}
              tintColors={{true: '#FFA500', false: '#FAFAFA'}}
              onValueChange={() => {
                setIsRent(!isRent);
              }}
            />
            <Text
              style={{
                color: '#FAFAFA',
                fontSize: 14,
              }}>
              Give it on rent instead
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleUploadProduct}
            style={{
              width: width - 40,
              marginVertical: 40,
              borderRadius: 6,
              backgroundColor: '#D18700',
              padding: 12,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '700', color: 'white'}}>
              Upload Product for sale
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sell;
