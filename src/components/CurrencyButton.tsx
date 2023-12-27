import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import type { PropsWithChildren } from 'react'

type CurrencyButtonProps = PropsWithChildren<{
    name: string;
    flag: string;
}>


export default function CurrencyButton(props: CurrencyButtonProps): JSX.Element {
  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.flag}>{props.flag}</Text>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flag: {
        fontSize: 28,
        color: '#ffffff',
        marginBottom: 4
    },
    name:{
        fontSize: 14,
        color: '#2d3436',
        marginBottom: 4
    }
})