import React, { useState } from 'react';
import { 
    View,
    Alert,
    StyleSheet,
    Text,
    Image,
    Platform,
    TouchableOpacity,
 } from 'react-native';

import { getBottomSpace } from 'react-native-iphone-x-helper';
import {SvgFromUri} from 'react-native-svg';
import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import { useRoute } from '@react-navigation/core';

import { color } from 'react-native-reanimated';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

interface Params {
    plant: {
        id: string;
        name: string;
        about: string; 
        water_tips: string;
        photo: string;
        environments: [string];
        frequency: {
        times: number;
        repeat_every: string;
        }
    }
}

export function PlantSave(){

    const [selectedDateTime, setSelectedDatetime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setSelectedDatetime(oldState => !oldState);
        }
    }

    return(
        <View style={styles.container}>

        <View style={styles.plantInfo}>
            <SvgFromUri 
                uri={plant.photo}
                height={150}
                width={150}
            />


            <Text style={styles.plantName}>
                {plant.name}
            </Text>

            <Text style={styles.plantAbout}>
                {plant.about}
            </Text>
        </View>

        <View style={styles.controller}>
            <View style={styles.tipContainer}>
                <Image 
                    source={waterdrop}
                    style={styles.tipImage}
                />

                <Text style={styles.tipText}>
                    {plant.water_tips}
                </Text>
            </View>

            <Text style={styles.alertLabel}>
                Escolha o melhor horário para ser lembrado:
            </Text>

            <DateTimePicker
                value={selectedDateTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
            />


            <Button 
                title="Cadastrar planta"
                onPress={() => {}}
            />
        </View>
        </View>
        
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        color: colors.shape,

    },

    plantInfo:{
       flex: 1,
       paddingHorizontal: 30,
       paddingVertical: 50,
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor: colors.shape
    },

    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },

    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop:10
    },

    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        fontSize: 17,
        marginTop: 10
    },

    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60,
    },

    tipImage: {
        width: 56,
        height: 56
    },

    tipText: {
        flex: 1,
        margin: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },

    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    }
});