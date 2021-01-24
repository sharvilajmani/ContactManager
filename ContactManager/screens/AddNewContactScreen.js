import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Keyboard, Alert, TouchableWithoutFeedback, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Form, Item, Input, Label, Button} from "native-base";

export default function AddNewContactScreen({navigation}) {
const [fname, setFname] = useState("");  
const [lname, setLname] = useState("");  
const [phone, setPhone] = useState("");  
const [email, setEmail] = useState("");  
const [address, setAddress] = useState("");  

let saveContact = async () => {
    if(fname !== "" && lname !== "" && phone !== "" && email != "" && address !== ""){
        var contact = {
            fname: fname,
            lname: lname,
            phone: phone,
            email: email,
            address: address
        }
        await AsyncStorage.setItem(Date.now().toString(),
        JSON.stringify(contact)
        )
        .then(() => {
            navigation.goBack();
        })
        .catch( error => {
            console.log(error);
        })
    } else {
        Alert.alert("All fields are required !");
    }
}
  return (
      <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss}}>
    <ScrollView style={styles.container}>
      <Form>
          <Item style={styles.inputItem}>
          <Label>First Name</Label>
          <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={fname => setFname(fname)}
          />  
          </Item>
          <Item style={styles.inputItem}>
          <Label>Last Name</Label>
          <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={lname => setLname(lname)}
          />  
          </Item>
          <Item style={styles.inputItem}>
          <Label>Phone Number</Label>
          <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="number-pad"
              onChangeText={phone => setPhone(phone)}
          />  
          </Item>
          <Item style={styles.inputItem}>
          <Label>Email</Label>
          <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={email => setEmail(email)}
          />  
          </Item>
          <Item style={styles.inputItem}>
          <Label>Address</Label>
          <Input 
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="default"
              onChangeText={address => setAddress(address)}
          />  
          </Item>
      </Form>
      <Button style={styles.button} full onPress={() => {saveContact()}}>
          <Text style={styles.buttonText}>Save</Text>
      </Button>
      <View style={styles.empty}></View>
    </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      margin: 10,
      height: 500
    },
    inputItem: {
      margin: 10
    },
    button: {
      backgroundColor: "#B83227",
      marginTop: 40
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold"
    },
    empty: {
      height: 500,
      backgroundColor: "#FFF"
    }
  });
