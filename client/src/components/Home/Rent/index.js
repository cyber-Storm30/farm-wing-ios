import {View, Text, FlatList, BackHandler, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../../Navbar';
import Product from '../RentProduct';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';

const Rent = ({navigation}) => {
  const [products, setProducts] = useState();

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        BackHandler.exitApp();
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const {data} = await axios.get(`${baseURL}/product/rent`);
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  const renderItem = ({item, index}) => {
    return <Product item={item} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#141414'}}>
      <Navbar navigation={navigation} />
      <View style={{backgroundColor: '#141414', flex: 1, alignItems: 'center'}}>
        <FlatList data={products} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Rent;
