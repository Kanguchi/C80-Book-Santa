import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import SantaAnimation from '../components/santaClaus'
import db from '../config';
import firebase from 'firebase';

;export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailD: '',
            password: '',
        }
    }
    userSignUp=(email, password)=>{
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                return alert('User added successfully');
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                return alert('Error Message');
  });
    userLogin=(email, password)=>{
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(()=>{
            return alert('Successfully Logged In');
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return alert('Error Message')
        })
    }

    }
    render(){
        return(
            <View style={styles.container}>
               <Text style={styles.title}>Book Santa</Text>
                <View>
                    <TextInput style={styles.loginBox}
                    placeholder='abc@example.com'
                    keyboardType='email-address'
                    onChangeText={(text)=>{
                        this.setState({emailID: text})
                    }}/>
                    <TextInput style={styles.loginBox}
                    secureTextEntry={true}
                    placeholder='enter password'
                    onChangeText={(text)=>{
                        this.setState({
                            password: text
                        })
                    }}/>
                    <TouchableOpacity style={[styles.button, {marginBottom: 20, marginTop: 20}]}
                    onPress={()=>{
                        this.userLogin(this.state.emailD, this.state.password);
                    }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.userSignUp(this.state.emailD, this.state.password);
                    }}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8be85'
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 65,
        fontWeight: '300',
        paddingBottom: 30,
        color: 'white'
    },
    loginBox:{
        width: 300,
        height: 40,
        borderBottomWidth: 1.5,
        borderColor: '#ff8a45',
        fontSize: 20,
        margin: 10,
        paddingLeft: 10
    },
    button: {
        width: 300,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#ff9800',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
    },
    buttonText: {
        color: '#ffff',
        fontWeight: '200',
        fontSize: 20,
        fontSize: 20,
    },
    buttonContainer:{
        flex: 1,
        alignItems: 'center'
    }
})