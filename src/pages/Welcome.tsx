import React from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

import watering from '../assets/watering.png';
import colors from '../styles/colors';
export function Welcome () {
    return (
        
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>
            Gerencie suas plantas de forma fácil

            </Text>

            <Image source={wateringImg} style={styles.image} />

            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você sempre que precisar.
            </Text>

            <TouchableOpacity style={styles.button}>
                <Text>
                    >
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize:32,
        fontWeight:'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38
    },

    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading
    },

    button: {
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom:10,
        height:56,
        width:56,
    },
    

})