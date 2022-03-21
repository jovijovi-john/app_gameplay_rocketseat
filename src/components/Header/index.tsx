import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

type Props = {
    title: string;
    action?: ReactNode; 
}

export function Header({ title, action} : Props) {
    
    const { secondary100, secondary40, heading} = theme.colors;
    const navigation = useNavigation();

    function handleGoBack() {
        navigation.goBack();
    }

    return (
        <LinearGradient 
            colors={[secondary100, secondary40]} 
            style={styles.container}
        >
            <TouchableOpacity onPress={handleGoBack}>
                <Feather
                    name='arrow-left'
                    size={24} 
                    color={heading}
                />
            </TouchableOpacity>
        
            <Text style={styles.title}>
                { title }
            </Text>

            {
                action ?
                <View>
                    {action}
                </View>
                : <View style={{width: 24}}/>
            }
        </LinearGradient>
    )
}