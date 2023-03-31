import {
  View,
  Text,
  FlatList,
  BackHandler,
  StatusBar,
  Platform,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navbar from '../../Navbar';
import Product from '../Product';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Shop = ({navigation}) => {
  const data = [
    {label: 'All', value: ''},
    {label: 'Fruit', value: 'fruit'},
    {label: 'Vegetable', value: 'vegetable'},
    {label: 'Live Stock', value: 'livestock'},
  ];
  const {width, height} = useWindowDimensions();
  const [products, setProducts] = useState();
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  console.log(value);
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
        const {data} = await axios.get(`${baseURL}/product?type=${value}`);
        console.log(data);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [value]);

  const renderItem = ({item, index}) => {
    return <Product item={item} />;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#141414'}}>
      {Platform.OS === 'ios' && (
        <StatusBar translucent backgroundColor="#5E8D48" />
      )}
      <Navbar navigation={navigation} />
      <Dropdown
        style={{
          width: width - 50,
          height: 50,
          borderColor: 'gray',
          borderWidth: 0.5,
          borderRadius: 8,
          paddingHorizontal: 8,
          backgroundColor: 'white',
          marginTop: 20,
          marginLeft: 24,
        }}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField={!isFocus ? '' : 'value'}
        placeholder={!isFocus ? 'Select filter' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <View style={{backgroundColor: '#141414', flex: 1, alignItems: 'center'}}>
        <FlatList data={products} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {},
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
