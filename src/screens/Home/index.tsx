import React, { useState, useCallback } from 'react';
import { View, Text, FlatList } from 'react-native'

import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from './styles';
import { Background } from '../../components/Background';

import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { COLLECTION_APPOINTMENT } from '../../configs/database';

export function Home() {
  
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [appointments, setAppointments] = useState<AppointmentProps[]>([])

  const navigation = useNavigation();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps){
    navigation.navigate("AppointmentDetails", { guildSelected });
  }
  
  function handleAppointmentCreate(){
    navigation.navigate("AppointmentCreate")
  }

  async function loadAppointments(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];
    
    if (category) {
      setAppointments(storage.filter(item => item.category == category));
    } else {
      setAppointments(storage)
    }

    setLoading(false);
  }

  // quando tiver com essa tela em foco, recarrega ela
  useFocusEffect(useCallback(() => {
    loadAppointments();
  }, [category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {
        loading ? <Load /> :
        <>
          <ListHeader 
          title='Partidas agendadas'
          subtitle={`Total ${appointments.length}`}
          />

          <FlatList 
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment 
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            ItemSeparatorComponent={()=> <ListDivider/>}
            style={styles.matches}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 69}}
          />
        </>
      }
    </Background>
  )
}