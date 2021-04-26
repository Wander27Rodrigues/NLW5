import React, { useEffect } from 'react';
import { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList
 } from 'react-native';
 

 import { Header } from '../components/Header';
 import { EnvironmentButton } from '../components/EnvironmentButton';
 import { PlantCardPrimary } from '../components/PlantCardPrimary';
 import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';




interface EnvironmentProps {
    title: string;
    key: string;
}

interface PlantProps {
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

export function PlantSelect (){
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFliteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelect, setEnvironmentSelect] = useState('all');
    const [loading, setLoading] = useState(true);
    
    // carregamaneto de pagina em api

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadinMore] = useState(false);
    const [loadingAll, setLoadinAll] = useState(false);
    
// filtro
function handleEnrivomentSelect(environment: string){
    setEnvironmentSelect(environment);

    if(environment == 'all')
        return setFliteredPlants(plants);

    const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );

        setFliteredPlants(filtered);


}

    useEffect(() => {
        async function fetchEnvironments() {
            const { data } = await api
            .get(`plants_environments?_sort=title&_order=asc`);
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                },   
                ...data
            ]);
        }
        fetchEnvironments();

        },[])

        useEffect(() => {
            async function fetchPlants(){
                const { data } = await api
                .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
                
                if(!data)
                return setLoading(true);

                if
                setPlants(data);
                setFliteredPlants(data);
                setLoading(false)
            }
                fetchPlants();    
            },[])
    
    // load animation
    if(loading)
            return <Load/>
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
                    active={ item.key === environmentSelect}
                    onPress={() => handleEnrivomentSelect(item.key)}
                    />

                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.enviromentlist}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    renderItem={( {item}) => (
                        <PlantCardPrimary data={item}/>
                    )}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}                    
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
    },

    plants:{
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
})