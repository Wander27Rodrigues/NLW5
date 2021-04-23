import React from 'react';
import { 
    View,
    Text,
    Image,
    StyleSheet, 
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';


import colors from '../styles/colors';
import userImg from '../assets/wander.png';



export function Header(){
    return(
        <View
            style={styles.container}
        >
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>Wnader</Text>
            </View>

            <Image source={userImg} style={styles.image} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '20',
        backgroundColor: colors.red,
        marginTop: getStatusBarHeight(),
        padding:20
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },


}) 