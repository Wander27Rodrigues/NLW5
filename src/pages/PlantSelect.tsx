import React, { useEffect } from 'react';
import { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
 } from 'react-native';
 

 import { Header } from '../components/Header';
 import { EnvironmentButton } from '../components/EnvironmentButton';
 import { PlantCardPrimary } from '../components/PlantCardPrimary';
 import { Load } from '../components/Load';
 import { useNavigation } from '@react-navigation/native';
 
 
 import colors from '../styles/colors';
 import fonts from '../styles/fonts';
 import api from '../services/api';
import { PlantProps } from '../libs/storage';





interface EnvironmentProps {
    title: string;
    key: string;
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
    
    const navigation = useNavigation();
    
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

//plantSelect
function handlePlantSelect(plant: PlantProps){
    navigation.navigate('PlantSave', { plant });
}

function handleFetchMore(distance: number){
    if(distance < 1)
        return;

    setLoadinMore(true);
    setPage(oldValue => oldValue + 1);
    fetchPlants();
}

async function fetchPlants(){
    const { data } = await api
    .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
    
    if(!data)
        return setLoading(true);

    if(page > 1){
        setPlants(oldValue => [...oldValue, ...data])
        setFliteredPlants(oldValue => [...oldValue, ...data])
    } else {
        setPlants(data);
        setFliteredPlants(data);
    }
    setLoading(false);
    setLoadinMore(false); 
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
                keyExtractor={(item) => String(item.key)}
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
                    keyExtractor={(item) =>String(item.id)}
                    renderItem={( {item}) => (
                        <PlantCardPrimary 
                            data={item}
                            onPress={() => handlePlantSelect(item)}

                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}   
                    onEndReachedThreshold={0.1}               
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd)
                    } 
                    ListFooterComponent={
                        loadingMore
                        ? <ActivityIndicator color={colors.green}/>
                        : <></>
                    }
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