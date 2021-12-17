import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import { getDatabase, push, ref, onValue, remove } from "firebase/database";
import { initializeApp } from "firebase/app";
import { auth, firebaseConfig } from './firebase';
import { TouchableOpacity } from 'react-native-web';
import { useNavigation } from '@react-navigation/core';
import firebase from "firebase/compat/app";


export default function Homescreen(props) {

  const [plantlist, setPlantlist] = React.useState([])
  const [idlist, setIdlist] = React.useState([])
  const [name, setName] = React.useState('')
  const [watering, setWatering] = React.useState('')
  const [lightning, setLightning] = React.useState('')
  const [nutrient, setNutrient] = React.useState('')
  const [facts, setFacts] = React.useState('')
  const [picture, setPicture] = React.useState('')
  const [number, setNumber] = React.useState('')

  let list = []

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const navigation = useNavigation()

   useEffect(() => {
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

  const handleSignOut = () => {
    auth
    .signOut()
    .then(() => {
      navigation.replace('Login')
    })
    .catch(error => alert(error.message))
  }

  const saveplant = () => {
    push(ref(database, 'plants/'), {
      'name': name, 'watering': watering, 'lightning': lightning, 'nutrient': nutrient, 'facts': facts, 'picture': picture
    })
    .catch(() => {
      alert("error submitting data")
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

  const deletePlant = () => {
    remove(ref(database, 'plants/' + idlist[number - 1]), {
    })
    .catch(() => {
      alert("error deleting data")
    })
}

  const { navigate } = props.navigation

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 26, fontWeight: '600', marginTop: '60px', color:'#363636'}}>Houseplant tracker</Text>
    
      <Text style={{fontSize: 16, marginTop: 40, fontWeight: '500', color:'#363636'}}>The name of your houseplant</Text>
      
      <TextInput placeholder={"text"} 
        style={styles.input}
        onChangeText={name => setName(name)}
        value={name}
        />
        <Text style={{fontSize: 16, marginTop: 10, fontWeight: '500', color:'#363636'}}>How often does it need water?</Text>
      <TextInput placeholder={"text"} 
        style={styles.input}
        onChangeText={watering => setWatering(watering)}
        value={watering}
        />
      <Text style={{fontSize: 16, marginTop: 10, fontWeight: '500', color:'#363636'}}>Optimal amount of lightning</Text>
      <TextInput placeholder={"text"} 
        style={styles.input}
        onChangeText={lightning => setLightning(lightning)}
        value={lightning}
        />
        <Text style={{fontSize: 16, marginTop: 10, fontWeight: '500', color:'#363636'}}>How often to add nutrients?</Text>
      <TextInput placeholder={"text"} 
        style={styles.input}
        onChangeText={nutrient => setNutrient(nutrient)}
        value={nutrient}
        />
        <Text style={{fontSize: 16, marginTop: 10, fontWeight: '500', color:'#363636'}}>Additional information</Text>
        <TextInput placeholder={"text"} 
        style={styles.input}
        onChangeText={facts => setFacts(facts)}
        value={facts}
        />
        <Text style={{fontSize: 16, marginTop: 10, fontWeight: '500', color:'#363636'}}>Set a picture</Text>
        <TextInput placeholder={"text"} 
        style={styles.input}
        onChangeText={picture => setPicture(picture)}
        value={picture}
        />
        <View style={{marginTop: '10px'}}/>
    <TouchableOpacity style={styles.button} onPress={saveplant}><Text style={styles.buttonText}>Add</Text></TouchableOpacity>
    <Text style={{fontSize: 22, marginTop: 40, marginBottom: 20, fontWeight: '500', color:'#363636' }}>Your houseplants</Text>
    <FlatList
    data={plantlist}
    keyExtractor={idlist => idlist.toString()}
    renderItem={({item}) =>
    <View style={{flexDirection: 'row', marginTop: 3, marginBottom: 3}}>
      <Text style={{fontSize:20}}>{item.name}  </Text>
      <TouchableOpacity style={styles.button}
      title='Details'
      onPress={() => navigate('Plant info', {item: JSON.stringify(item)})}
      ><Text style={styles.buttonText}>Details</Text></TouchableOpacity>
      
    </View>}
    ItemSeparatorComponent={listSeparator}
    />

    <Text style={{fontSize: 16, marginTop: 50, marginBottom: 10, fontWeight: '500', color:'#363636'}}>Delete by order</Text>
        <TextInput placeholder={"number"} 
        style={styles.input}
        onChangeText={number => setNumber(number)}
        value={number}
        />
        <TouchableOpacity style={styles.removebutton} onPress={deletePlant}><Text style={styles.buttonText}>Delete</Text></TouchableOpacity>
    <TouchableOpacity
      onPress={handleSignOut}
      style={styles.signoutbutton}
      >
    
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>
    <Text>Signed in as: {auth.currentUser?.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  topcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  inputContainer: {
    width: '300px'
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 5,
  },
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
});