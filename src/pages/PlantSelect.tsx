import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
 } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../components/Header';

export function PlantSelect (){
    return(
        <View 
            style={styles.container}
        >
            <Header />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,

    }
})