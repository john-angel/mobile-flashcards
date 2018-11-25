import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import {green, purple} from '../utils/colors'

export default function TextButton({ disabled,children, onPress, style = {}  }) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
            <Text style={[styles.reset, style]} >{children}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    reset: {
      textAlign: 'center',
      color: green,
      fontSize: 19
    }
})