import * as React from 'react';
import {Text, View, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native';
import MyHeader from '../components/MyHeader';
import firebase from 'firebase';
import db from '../config';

export default class SettingScreen extends React.Component{
    constructor(){
        super();
        this.state={
            firstName: '',
            lastName: '',
            mobile_number: '',
            address: '',
            emailID: '',
            docID: '',
        };
    }
    getUserDetails=()=>{
        //var user = firebase.auth().currentUser;
        var email = firebase.auth().currentUser.email;
        db.collection("users").where("emailID", "==", email).get().then((snapshot)=>{
            snapshot.forEach(doc)=>{
                var data = doc.data()
                this.setState({
                    emailID: data.email_ID,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    address: data.address,
                    mobile_number: data.mobile_number,
                    docID: doc.id           
                })
            }) 
        }
    }
    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docID).update({
            'first_name': this.state.firstName,
            'last_name': this.state.lastName,
            'address': this.state.addres,
            'mobile_number': this.state.mobile_number,
            'emailID': this.state.emailID
        })
        Alert.alert('Profile updated successfully')
    }
    componentDidMount(){
        this.getUserDetails();
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader title='Settings' navigation={this.props.navigation}/>
                <View sytle={styles.formContainer}>
                <TextInput style={styles.formTextInput}
                placeholder={'First Name'}
                maxLength={8}
                onChangeText={(text)=>{
                    this.setState({firstName: text})
                }}
                vaule={this.state.firstName}/>
                <TextInput style={styles.formTextInput}
                placeholder={'Last Name'}
                maxLength={10}
                onChangeText={(text)=>{
                    this.setState({lastName: text})
                }}
                value={this.state.lastName}/>
                <TextInput style={styles.formTextInput}
                placeholder={'Contact'}
                maxLength={10}
                keyboardType='numeric'
                onChangeText={(text)=>{
                    this.setState({mobile_number : text})
                }}
                value={this.state.contact}/>
                <TextInput style={styles.formTextInput}
                placeholder={'Email'}
                keyboardType='email-address'
                onChangeText={(text)=>{
                    this.setState({email: text})
                }}/>
                <TextInput style={styles.formTextInput}
                placeholder={'Address'}
                multiline={true}
                onChangeText={(text)=>{
                    this.setState({addres: text})
                }}
                value={this.state.addres}/>
                <TouchableOpacity style={styles.button}
                onPress={()=>{
                    this.updateUserDetails()
                }}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    formTextInput:{
        width: '75%',
        height: 35,
        alignSelf:'center',
        borderColor: '#ffab91',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 20,
        padding: 10
    },
    button: {
        width: '75%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#775722',
        shadowColor: '#000',
        shadowOffset: {width: 0, height:8},
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20,
        paddingHorizontal: 10
    },
    buttonText :{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff'
    }

})