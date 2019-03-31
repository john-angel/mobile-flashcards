import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import {white, green, red, blue} from '../utils/colors'

export default function TextButton({ disabled,children, onPress, type, buttonStyle = {},textStyle = {}  }) {
    return (
        <TouchableOpacity style={buttonStyle} disabled={disabled} onPress={onPress}>
            <Text style={[styles[type], textStyle]} >{children}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    yes: {
        textAlign: 'center',
        color:green,
        fontSize: 19,
        marginBottom:10
    },
    no: {
        textAlign: 'center',
        color: red,
        fontSize: 19,
        marginBottom:10
    },
    standard: {
        color: blue,
        fontSize: 19
    }
})