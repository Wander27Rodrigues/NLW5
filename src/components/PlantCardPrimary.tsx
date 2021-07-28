import React from 'react';
import { 
    Text,
    StyleSheet, 
} from 'react-native';
import  { SvgFromUri } from 'react-native-svg';

import {  RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

// typeScript
interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
    }
}

export const PlantCardPrimary = ({ data, ...rest} : PlantProps) => {
    return(
        <RectButton
            style={styles.container}
        >        
        <SvgFromUri 
            uri={data.photo} 
            width={70} 
            height={70}  
        />
        <Text  style={styles.text}>
            { data.name }
        </Text>
        </RectButton>
    )
}

const styles= StyleSheet.create({
  
    container:{
        flex:1,
        maxWidth: '45%',
        backgroundColor: colors.shape,
        paddingVertical: 10,
        alignItems: 'center',
        margin: 10
    },

    text:{
        color: colors.green_dark,
        fontFamily: fonts.heading,
        marginVertical:16,
    }
}) 