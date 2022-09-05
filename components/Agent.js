import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {width} from '../styles/Others';
import {BLACK, LIGHT_GRAY, SWISS_RED, WHITE} from '../styles/Colors';
import {BOLD, REGULAR} from '../styles/Fonts';
import Icon from "react-native-vector-icons/FontAwesome5";
import RegularButton from './RegularButton';

export default function Agent({agent,pending,acceptAgent,rejectAgent,deleteAgent}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: width - 30,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: LIGHT_GRAY,
        padding: 10,
        borderRadius: 5,
      }}>
      <Image
        style={{
          width: 100,
          height: 100,
          backgroundColor: WHITE,
          borderRadius: 5,
        }}
        source={{uri: agent.licenseImage}}
      />
      <View style={{paddingLeft: 10}}>
          <Item important title={agent.name} label="NAME"/>
          <Item title={agent.email} label="EMAIL"/>
          <Item title={agent.licenseID} label="ID"/>
     {!pending &&<Icon name="trash-alt" color='red' size={20} style={{alignSelf:'flex-end',}} onPress={deleteAgent}/>}
     {pending && <View style={{flexDirection:'row'}}>
         <RegularButton title="Accept" mr={10} onPress={acceptAgent}/>
         <RegularButton title="Reject" buttonStyle={{backgroundColor:SWISS_RED}} onPress={rejectAgent}/>
         </View>}
      </View>
    </TouchableOpacity>
  );
}
const Item = ({title,label,important})=> <View style={{flexDirection:'row',alignItems:'center'}}>
    <Text style={{...styles.regular,fontFamily:important?BOLD:REGULAR,width:60}}>{label}</Text>
    <Text style={{...styles.regular,fontFamily:important?BOLD:REGULAR,width:15}}>:</Text>
    <Text style={{...styles.regular,fontFamily:important?BOLD:REGULAR}}>{title}</Text>
</View>

const styles = StyleSheet.create({
  regular: {fontFamily: REGULAR, color: BLACK, marginBottom: 5, fontSize: 15},
});
