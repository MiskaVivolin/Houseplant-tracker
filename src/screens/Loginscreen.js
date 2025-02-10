import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, TextInput, View, Text, Pressable } from 'react-native'
import { auth } from '../firebase'
import { useEffect } from 'react'

const Loginscreen = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = () => {
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log('Registered with:', user.email)
        })
        .catch(error => alert(error.message))
    }

    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user
            console.log('Logged in with: ', user.email)
        })
        .catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Houseplant tracker</Text>
            <View style={styles.inputContainer}>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput 
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={handleLogin}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}>
                    <Text style={styles.buttonOutlineText}>Register</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Loginscreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    input: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    header: {
        fontSize: 26, 
        fontWeight: '500',
        margin: 50, 
        color:'#363636'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: 100,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 1
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
  });