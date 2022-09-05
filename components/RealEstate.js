import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {height, width} from '../styles/Others';
import {
  BG_SHADE,
  GOLD_YELLOW,
  BLACK,
  WHITE,
  LIGHT_GRAY,
  GRAY,
} from '../styles/Colors';
import {BOLD, REGULAR} from '../styles/Fonts';
import {moderateScale} from '../styles/Scalling';
import Icon from 'react-native-vector-icons/Entypo';
import FontIcon from 'react-native-vector-icons/FontAwesome5';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Context from '../context/Context';

export default function RealEstate({item}) {
  const {darkMode} = useContext(Context);
  const {navigate} = useNavigation();
  return (
    <TouchableOpacity
      style={{...styles.container, backgroundColor: darkMode ? BLACK : WHITE}}
      activeOpacity={0.8}
      onPress={() => navigate('RealEstate', {item})}>
      <SwiperFlatList
        autoplay
        autoplayDelay={4}
        autoplayLoop
        showPagination
        paginationDefaultColor={LIGHT_GRAY}
        paginationStyle={{top: height * 0.195}}
        paginationActiveColor={GOLD_YELLOW}
        paginationStyleItem={{width: 8, height: 8}}
        data={item.images}
        style={{width}}
        renderItem={({item}) => (
          <ImageBackground
            style={styles.image}
            source={{uri: item}}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
          />
        )}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.favIcon}>
        <FontIcon name="heart" size={20} color={BLACK} />
      </TouchableOpacity>
      <View style={{paddingHorizontal: 15, paddingBottom: 15}}>
        <Text style={{...styles.title, color: darkMode ? WHITE : BLACK}}>
          ${item.price}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="location"
              size={15}
              color={GRAY}
              style={{marginRight: 5}}
            />
            <Text style={{...styles.regular, color: GRAY}}>
              {item.location}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FontIcon
              name="vector-square"
              size={15}
              color={GRAY}
              style={{marginRight: 5}}
            />
            <Text style={{...styles.regular, color: GRAY}}>{item.area}sq</Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: 2,
            backgroundColor: LIGHT_GRAY,
            marginVertical: 15,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row'}}>
            <FontIcon
              name="bed"
              size={15}
              color={GOLD_YELLOW}
              style={{marginRight: 5}}
            />
            <Text style={styles.regular}>{item.bedrooms} Beds</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FontIcon
              name="bath"
              size={15}
              color={GOLD_YELLOW}
              style={{marginRight: 5}}
            />
            <Text style={styles.regular}>{item.bathrooms} Baths</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <FontIcon
              name="car"
              size={15}
              color={GOLD_YELLOW}
              style={{marginRight: 5}}
            />
            <Text style={styles.regular}>{item.parkings} Parkings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width - 30,
    borderRadius: 15,
    marginBottom: 15,
    backgroundColor: WHITE,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    borderWidth: 1,
    borderColor: LIGHT_GRAY,
  },
  favIcon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    width: 40,
    height: 40,
    backgroundColor: WHITE,
    marginTop: -20,
    marginRight: 20,
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    borderRadius: 100,
  },
  image: {
    width: width - 30,
    height: height * 0.23,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: WHITE,
  },
  title: {
    fontFamily: BOLD,
    color: BLACK,
    fontSize: moderateScale(18),
    letterSpacing: 0.3,
    paddingBottom: 6,
  },
  regular: {
    fontFamily: REGULAR,
    color: GOLD_YELLOW,
    fontSize: moderateScale(14),
    letterSpacing: 0.3,
  },
});
