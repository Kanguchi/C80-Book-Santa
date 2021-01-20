import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import MyHeader from '../components/MyHeader';

export default class BookRequestScreen extends Component{
    render(){
        return(
            <View>
                <MyHeader />
                <KeyboardAvoidingView>
                    
                </KeyboardAvoidingView>
            </View>
        );
    }
}