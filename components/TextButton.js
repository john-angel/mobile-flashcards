import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import {green, red, blue} from '../utils/colors'

export default function TextButton({ disabled,children, onPress, type, style = {}  }) {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
            <Text style={[styles[type], style]} >{children}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    yes: {
        textAlign: 'center',
        color: green,
        fontSize: 19
    },
    no: {
        textAlign: 'center',
        color: red,
        fontSize: 19

    },
    standard: {
        color: blue,
        fontSize: 19
    }
})