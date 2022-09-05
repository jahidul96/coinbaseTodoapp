import { Pressable, ImageBackground } from "react-native";
import React, { useState } from "react";
import { GRAY, WHITE } from "../styles/Colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import { width } from "../styles/Others";

export default function AddImage({ image, onPress,multiple  }) {
  return (
    <Pressable onPress={onPress}>
      <ImageBackground
        style={{
          width: (width-60)/4,
          height: (width-60)/4,
          backgroundColor: GRAY,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: 10,
          marginTop: 10
        }}
        key={image}
        source={{ uri: image }}
      >
        {!image && (
          <Icon
            size={width *.14}
            color={WHITE}
            name={multiple?'plus':"camera"}
          />
        )}
      </ImageBackground>
      
    </Pressable>
  );
}
