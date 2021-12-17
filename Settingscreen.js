import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function Settingscreen({ route }) {


    const { item } = route.params
    const plantinfo = JSON.parse(item)

return (
    <View style={styles.container}>
        <Text style={{fontSize: 18, marginBottom: 25, fontWeight:'500', color:'#363636'}}>Information about {plantinfo.name}</Text>
        <Text style={{fontSize: 16, marginBottom: 2}}>Remember to water it {plantinfo.watering}</Text>
        <Text style={{fontSize: 16, marginBottom: 2}}>{plantinfo.name} lightning needs: {plantinfo.lightning}</Text>
        <Text style={{fontSize: 16, marginBottom: 2}}>Apply nutrients {plantinfo.nutrient}</Text>
        <View style={styles.textcontainer}>
        <Text style={{fontSize: 16, marginBottom: 2}}>{plantinfo.facts}</Text>
        <Image
        style={{width: 300, height: 300}}
        source={{uri:plantinfo.picture}}
        />
        
        </View>
    </View>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textcontainer: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
  });