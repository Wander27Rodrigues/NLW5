import React, { useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList
 } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { Header } from '../components/Header';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { useState } from 'react';
import api from '../services/api';


interface EnvironmentProps {
    title: string;
    key: string;
}

export function PlantSelect (){
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);

    useEffect(() => {
        async function fetchEnvironments() {
            const { data } = await api.get('plants_environments');
            setEnvironments(data);
        }
        fetchEnvironments();

        },[])


    return(
        <View 
            style={styles.container}
        >
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                data={environments}
                renderItem={({ item }) => (
                    <EnvironmentButton 
                    title={item.title} 
                    active 
                    />

                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentlist}
                />
            </View>
            

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background,
    },

    header: {
        paddingHorizontal: 30
    },

    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15,
    },

    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },

    enviromentlist:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    }
})