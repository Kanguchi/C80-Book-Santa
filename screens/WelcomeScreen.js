import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet, TouchableOpacity, Image, Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailID: '',
            password: '',
            confirmPassword: '',
            first_name: '',
            last_name: '',
            address: '',
            mobile_number: '',
            isModalVisible: 'false',
        }
    }
    userSignUp=(email, password, confirmPassword)=>{
        if (password !== confirmPassword){
            return alert("Password doesn't match\nCheck your password")
        } else {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    db.collection('users').add({
                         first_name: this.state.first_name,
                         last_name: this.state.last_name,
                         mobile_number: this.state.mobile_number,
                         emailID: this.state.emailID,
                         address: this.state.address})
                    return alert( 'User Added Successfully', 
                        '', 
                        [ {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})}, 
                        ]
                         );
                     })
                .catch((error)=>{
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    return alert('Error Message');
            });
        }
    }
    userLogin=(emailID, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID, password)
        .then(()=>{
            this.props.navigation.navigate('DonateBooks')
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            return alert('Error Message')
        })
    }
    showModal=()=>{
        return(
            <Modal 
                animationType='fade'
                transparent={true}
                visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: '100%'}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text style={styles.modalTitle}>Registration</Text>
                            <TextInput style={styles.formTextInput} 
                            placeholder={"First Name"}
                            maxLength={8}
                            onChangeText={(text)=>{
                                this.setState({first_name: text})
                            }}></TextInput>
                            <TextInput style={styles.formTextInput}
                            placeholder={"Last Name"}
                            maxLength={8}
                            onChangeText={(text)=>{
                                this.setState({last_name: text})
                            }}></TextInput>
                            <TextInput style={styles.formTextInput}
                            placeholder={'Phone Number'}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({mobile_number: text})
                            }}></TextInput>
                            <TextInput style={styles.formTextInput}
                            placeholder={'Address'}
                            multiline={true}
                            onChangeText={(text)=>{
                                this.setState({address: text})
                            }}></TextInput>
                            <TextInput style={styles.formTextInput}
                            placeholder={'Email'}
                            keyboardType='email-address'
                            onChangeText={(text)=>{
                                this.setState({emailID: text})
                            }}></TextInput>
                            <TextInput style={styles.formTextInput}
                            placeholder={'Password'}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                                this.setState({password: text})
                            }}></TextInput>
                            <TextInput style={styles.formTextInput}
                            placeholder={'Confirm Password'}
                            secureTextEntry={true}
                            onChangeText={(text)=>{
                                this.setState({confirmPassword: text})
                            }}></TextInput>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.registerButton}
                                onPress={()=>this.userSignUp(this.state.emailID, this.state.password, this.state.confirmPassword)}>
                                    <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity style={styles.cancelButton}
                                onPress={()=>this.setState({'isModalVisible': false})}>
                                    <Text style={{color: '#ff5722'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                </View>
                {
                    this.showModal()
                }
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.title}>Book Santa</Text>
                    <Image source={require('../assets/santa.gif')} style={{width: 200, height: 180}}/>
                </View>
                <View style={styles.profileContainer}>
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
                        console.log(this.state.emailID)
                        this.userLogin(this.state.emailID, this.state.password);
                    }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={()=>{
                        this.setState({isModalVisible: true})
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
        fontSize: 60,
        fontWeight: '300',
        paddingVertical: 30,
        textAlign: 'center',
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
    KeyboardAvoidingView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"#ffff",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'#ff5722',
        fontSize:15,
        fontWeight:'bold'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
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
    },
    buttonContainer:{
        flex: 1,
        alignItems: 'center'
    }
})