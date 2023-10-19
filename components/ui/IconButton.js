import React from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import {Ionicons} from '@expo/vector-icons'

const IconButton = ({icon, size, color, onPress}) => {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
        <View  style={styles.buttonContainer}>
            <Ionicons name={icon} size={size} color={color} />
        </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    borderRadius: 24,
    margin: 8
  },
  pressed: {
    opacity: .75
  },
});

export default IconButton;
