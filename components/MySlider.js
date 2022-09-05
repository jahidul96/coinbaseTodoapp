import React from 'react';
import {Slider, Icon} from '@rneui/themed';
import {LIME_GREEN} from '../styles/Colors';
import {Text, View} from 'react-native';
import {BOLD} from '../styles/Fonts';
import {width} from '../styles/Others';

export default function MySlider({value, setValue, maxValue, minValue, price}) {
  return (
    <Slider
      value={value}
      onValueChange={setValue}
      maximumValue={maxValue}
      minimumValue={minValue}
      step={1}
      allowTouchTrack
      trackStyle={{
        height: 4,
        width: width - 30,
        backgroundColor: 'transparent',
      }}
      thumbStyle={{height: 20, width: 20, backgroundColor: 'transparent'}}
      thumbProps={{
        children: (
          <View style={{width: width - 30}}>
            <Icon
              name="circle"
              type="font-awesome"
              size={15}
              reverse
              containerStyle={{bottom: 15, left: -7}}
              color={LIME_GREEN}
            />
            <Text
              style={{
                fontFamily: BOLD,
                color: LIME_GREEN,
                fontSize: 16,
                bottom: 20,
              }}>
              {price && '$'}
              {value}
            </Text>
          </View>
        ),
      }}
    />
  );
}
