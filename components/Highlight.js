import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {height, width} from '../styles/Others';
import {BG_SHADE, GOLD_YELLOW, WHITE} from '../styles/Colors';
import {BOLD, REGULAR} from '../styles/Fonts';
import {moderateScale} from '../styles/Scalling';
import Icon from 'react-native-vector-icons/Entypo';
import FontIcon from 'react-native-vector-icons/FontAwesome5';

export default function Highlight({item}) {
  const {navigate} = useNavigation();
  return (
    <ImageBackground
      style={{...styles.container}}
      source={{uri: item.images[0]}}
      borderRadius={15}>
      <TouchableOpacity
        style={{...styles.container, padding: 15}}
        activeOpacity={0.8}
        onPress={() => navigate('RealEstate', {item})}>
        <Text style={styles.tag}>for {item.type}</Text>
        <View>
          <Text style={styles.title}>{item.title}</Text>
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
                color={WHITE}
                style={{marginRight: 5}}
              />
              <Text style={styles.regular}>{item.location}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontIcon
                name="vector-square"
                size={15}
                color={WHITE}
                style={{marginRight: 5}}
              />
              <Text style={styles.regular}>{item.area}sq</Text>
            </View>
            <Text style={styles.title}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width - 30,
    height: height * 0.27,
    borderRadius: 15,
    backgroundColor: BG_SHADE,
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: GOLD_YELLOW,
    borderRadius: 6,
    padding: 7,
    width: 100,
    textAlign: 'center',
    fontFamily: BOLD,
    color: WHITE,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: BOLD,
    color: WHITE,
    fontSize: moderateScale(18),
    letterSpacing: 0.3,
    paddingBottom: 6,
  },
  regular: {
    fontFamily: REGULAR,
    color: WHITE,
    fontSize: moderateScale(14),
    letterSpacing: 0.3,
  },
});
