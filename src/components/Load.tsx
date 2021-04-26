import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottiView from 'lottie-react-native';

import loadAnimation from '../assets/load.json';
// import { Container } from './styles';

export function Load(){
    return(
        <View style={styles.container}>
            <LottiView
                source={loadAnimation}
                autoPlay
                loop
                style={styles.animation}
            
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },

    animation:{ 
        backgroundColor: 'transparent',
        width: 200,
        height: 200,

    }
})
