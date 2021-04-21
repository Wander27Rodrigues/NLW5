import React from 'react';
import { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    // keyboardAvoidView - eleva os elementos para ficarem visiveis durante um ação
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

// componentButton
import { Button } from '../components/Button';


import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function UserIdentification(){

    const [isFocused, serIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();



    function handInputBluer (){
        serIsFocused(false);
        serIsFocused(!!name);
    }

    function handInputFocus (){
        serIsFocused(true);
    }

    function handInputChange (value: string){
        // !! transforma o conteudo em um boolean
        setIsFilled(!!value);
        setName(value);
    }
    return(
        <SafeAreaView style={styles.container}>
            
            <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
            <View style={styles.contatent}>
                <View style={styles.form} >
                <View style={styles.header}>
                        <Text 
                            style={styles.emoji}>
                                { isFilled ? '😊' : '😕' }  
                        </Text>

                        <Text 
                        style={styles.title}>
                            Como podemos {'\n'}
                            chamar você?   
                        </Text>
                </View>
                    <TextInput 
                    style={[
                        styles.input,
                        (isFocused || isFilled) &&
                        { borderColor: colors.green }
                    ]}
                    placeholder="Digite um nome"
                    onBlur={handInputBluer}
                    onFocus={handInputFocus}
                    onChangeText={handInputChange}
                    />
                    
                    <View 
                    style={styles.footer}>
                    <Button/>
                    </View>

                </View>
            </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
        
}

// styles css
const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent:'space-around',
    },

    contatent: {
        flex: 1,
        width: '100%',
    },

    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal:  54,
        alignItems: 'center',
    },

    header: {
        alignItems: 'center',
    },

    emoji: {
        fontSize: 44,
    },

    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },

    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    }


})