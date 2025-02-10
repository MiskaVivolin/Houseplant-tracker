import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getDatabase, push, ref } from "firebase/database";
import { initializeApp } from "firebase/app";
import { auth, firebaseConfig } from '../firebase';
import { useNavigation } from '@react-navigation/core';


export default function Homescreen() {

  const [name, setName] = React.useState('')
  const [watering, setWatering] = React.useState('')
  const [lightning, setLightning] = React.useState('')
  const [nutrient, setNutrient] = React.useState('')
  const [facts, setFacts] = React.useState('')
  const [picture, setPicture] = React.useState('')
  const [image, setImage] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  const navigation = useNavigation()
  
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    }, [])
    
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
    const takePhoto = async () => {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
    if (hasPermission === null) {
      return <Text>Requesting permissions...</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera or media library</Text>;
    }

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
                    <Pressable style={styles.button}
                    title='Details'
                    onPress={() => navigation.replace('Viewlist')}
                    ><Text style={styles.buttonText}>Plant list</Text></Pressable>
    <Pressable style={styles.button} onPress={saveplant}><Text style={styles.buttonText}>Add</Text></Pressable>
    <Pressable style={styles.button} title="Pick an image from gallery" onPress={pickImage}><Text style={styles.buttonText}>Pick</Text></Pressable>
    <Pressable style={styles.button} title="Take a photo" onPress={takePhoto}><Text style={styles.buttonText}>Take</Text></Pressable>
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 20 }} />}

    <Pressable
      onPress={handleSignOut}
      style={styles.signoutbutton}
      >
    
      <Text style={styles.buttonText}>Sign out</Text>
    </Pressable>
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