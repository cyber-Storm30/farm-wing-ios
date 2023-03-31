import {
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../Input';
import {useEffect} from 'react';
import axios from 'axios';
import {baseURL} from '../../../Services/apiClient';
import {useDispatch} from 'react-redux';
import {setUser} from '../../../redux/Actions/auth';
// import ImagePicker from 'react-native-image-crop-picker';

const EditProfileModal = ({
  navigation,
  isEditProfileOpen,
  setIsEditProfileOpen,
  userId,
  user,
  setCounter,
}) => {
  const {height, width} = useWindowDimensions();
  console.log('userId in EditProfileModal', userId);
  console.log('name in EditProfileModal', user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [disable, setDisable] = useState(true);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState(user.image);

  const handleEditProfile = async () => {
    try {
      setIsLoading(true);
      const res = await axios.put(`${baseURL}/user/update/${user._id}`, {
        userId: user._id,
        name: name,
        email: email,
        image: image,
      });
      console.log('after edit', res.data);
      if (res.status == 200) {
        setIsEditProfileOpen(false);
        // dispatch(setUser(res.data));
        setCounter(prev => prev + 1);
      } else {
        Alert.alert('Some Error Occurred, Try Again');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = async () => {
    // try {
    //   const img = await ImagePicker.openPicker({
    //     width: 500,
    //     height: 500,
    //     cropping: true,
    //   });
    //   console.log(img);
    //   if (img.size > 5000000) {
    //     Alert.alert(
    //       'Thumbnail Image size exceeded',
    //       'Thumbnail image are limited to 5 mb in size. Please resize the image.',
    //       [
    //         {
    //           text: 'Ok',
    //           onPress: () => {
    //             console.log(img);
    //           },
    //         },
    //       ],
    //     );
    //   } else {
    //     console.log('Image', img);
    //     const pathArray = img.path.split('/').slice(-1);
    //     const imgName = pathArray[0];
    //     console.log('pathArray', pathArray);
    //     console.log('imgName', imgName);
    //     const formData = new FormData();
    //     formData.append('profile_picture', {
    //       uri: img.path,
    //       type: img.mime,
    //       name: imgName,
    //     });
    //     const URL = `${baseURL}/uploadProfileImage?student_id=${studentId}`;
    //     const res = await fetch(URL, {
    //       method: 'post',
    //       body: formData,
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     let responseJson = await res.json();
    //     console.log(responseJson.profilePicUrl);
    //     console.log(responseJson.status);
    //     if (responseJson.status === 200) {
    //       ImagePicker.clean()
    //         .then(response => {
    //           console.log('removed all temp files', response);
    //         })
    //         .catch(e => {
    //           Alert.alert(e);
    //         });
    //     }
    //     dispatch(updateProfilePhoto(responseJson.profilePicUrl));
    //     setCounter(prev => prev + 1);
    //   }
    // } catch (error) {
    //   Alert.alert('Some Error Occcured');
    // }
  };

  useEffect(() => {
    if (name.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [name]);

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <Modal
        visible={isEditProfileOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsEditProfileOpen(false)}>
        <ScrollView style={styles.container}>
          <View
            style={{
              //   marginLeft: 20,
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => setIsEditProfileOpen(false)}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 20,
                }}>
                {`Back`}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={{
              marginTop: 20,
              alignSelf: 'center',
              fontSize: 24,
              color: 'white',
              fontWeight: '700',
            }}>
            Edit Profile
          </Text>
          <TouchableOpacity
            onPress={handleUpload}
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              style={{width: 70, height: 70, borderRadius: 50}}
              source={{
                uri:
                  user.image?.length > 0
                    ? user.image
                    : `https://ui-avatars.com/api/?name=${user.name}&length=1&background=0EC99E&color=fff&size=64`,
              }}
            />
          </TouchableOpacity>
          <View style={{marginTop: 20}}>
            <Input
              heading="Name"
              //   disableInputHeading={true}
              placeholder="Edit Name"
              onChange={val => {
                setName(val);
              }}
              name="name"
              value={name}
              required
            />
          </View>
          <View style={{marginTop: 10}}>
            <Input
              heading="Email"
              //   disableInputHeading={true}
              placeholder="Edit Email"
              onChange={val => {
                setEmail(val);
              }}
              name="email"
              value={email}
              required
            />
          </View>
          <View style={{marginTop: 10}}>
            <Input
              heading="Image"
              //   disableInputHeading={true}
              placeholder="Image"
              onChange={val => {
                setImage(val);
              }}
              name="image"
              value={image}
              required
            />
          </View>
          <TouchableOpacity
            onPress={handleEditProfile}
            disabled={disable && !isLoading}
            style={{
              width: width - 40,
              marginVertical: 40,
              borderRadius: 6,
              backgroundColor: disable ? 'grey' : 'lightgreen',
              padding: 16,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
              {isLoading ? 'Loading...' : 'Edit Profile'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#141414',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
