import React, { useState } from 'react';
import {TextInput,TouchableOpacity,View,StyleSheet, Dimensions,Text} from 'react-native';

function Input (props){

    const [text,setText] = useState("");
    
    const changeHandler =(val) =>{
        setText(val);
      }

    return(
        <View style={styles.container}>
            <TextInput style={styles.input} value={text} placeholder={props.placeholder} testID={props.inputId} onChangeText={changeHandler} clearTextOnFocus/>
            <TouchableOpacity style={styles.button} testID={props.buttonId} onPress={() => {props.press(text);setText('')}}>
            <Text style={{fontSize:20}}>{props.title}</Text>    
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#E0E0E0",
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center", 
    },
    container:{
        flex:1,
        padding:20,
        width:Dimensions.get("window").width,
        justifyContent:"center"
        
    },
    input:{
        
        backgroundColor:"white",
        borderRadius:5,
        padding:5,
        marginBottom:10,
    }
})

export {Input};