import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native'
import { getDatabase, push, ref, onValue, remove } from "firebase/database";
import React, { useEffect, useState } from 'react'
import { auth, firebaseConfig } from '../firebase';
import { useNavigation } from '@react-navigation/core';
import { initializeApp } from "firebase/app";

const Viewplantscreen = () => {

    const [plantlist, setPlantlist] = React.useState([])
    const [idlist, setIdlist] = React.useState([])
    const [number, setNumber] = React.useState('')
    
  const database = getDatabase(app);
  const app = initializeApp(firebaseConfig);
  const navigation = useNavigation()
    let list = []

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    const plantsRef = ref(database, 'plants/')
    onValue(plantsRef, (snapshot) => {
      const data = snapshot.val()
        setPlantlist(Object.values(data))
      })
      onValue(plantsRef, (snapshot) => {
        const data = snapshot.val()
        const datatostring = Object.keys(data) + ''
        list = datatostring.split(',')
        setIdlist(list)
      })
    }, [])

  const deletePlant = () => {
    remove(ref(database, 'plants/' + idlist[number - 1]), {
    })
    .catch(() => {
      alert("error deleting data")
    })
}

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          
        }}
      />
    )
  }

  return (
    <View>
          <Text style={{fontSize: 22, marginTop: 40, marginBottom: 20, fontWeight: '500', color:'#363636' }}>Your houseplants</Text>
          <Pressable style={styles.removebutton} onPress={deletePlant}><Text style={styles.buttonText}>Delete</Text></Pressable>
          <Pressable style={styles.button}
            title='Details'
            onPress={() => navigation.replace('Home')}
            ><Text style={styles.buttonText}>Add new</Text></Pressable>
          <FlatList
          data={plantlist}
          keyExtractor={idlist => idlist.toString()}
          renderItem={({item}) =>
          <View style={{flexDirection: 'row', marginTop: 3, marginBottom: 3}}>
            <Text style={{fontSize:20}}>{item.name}  </Text>
            <Pressable style={styles.button}
            title='Details'
            onPress={() => navigate('Plant info', {item: JSON.stringify(item)})}
            ><Text style={styles.buttonText}>Details</Text></Pressable>
            
          </View>}
          ItemSeparatorComponent={listSeparator}
          />
    </View>
  )
}

export default Viewplantscreen

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#0782F9',
        width: '60px',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
      },
      signoutbutton: {
        backgroundColor: '#0782F9',
        width: '100px',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '80px'
      },
      buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
      },
      buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
      removebutton: {
        backgroundColor: '#e74340',
        width: '60px',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '10px'
    },
})