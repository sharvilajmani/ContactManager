import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState} from 'react';
import {   StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
 } from 'react-native';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { Form, Item, Input, Label, Button } from "native-base";

export default function EditContactScreen({navigation,route}) {
  const [contact, setContact] = useState({
    fname: "",
    lname: "",
    phone: "",
    email: "",
    address: "",
    key: ""
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
        let key = route.params.key;
        getContact(key);
    })
  });

  let getContact = async key => {
    await AsyncStorage.getItem(key)
      .then(contactjsonString => {
        var contact = JSON.parse(contactjsonString);
        contact["key"] = key;
        setContact(contact);
      })
      .catch(error => {
        console.log(error);
      });
  };

  let updateContact = async key => {
    if (
      contact.fname !== "" &&
      contact.lname !== "" &&
      contact.phone !== "" &&
      contact.email !== "" &&
      contact.address !== ""
    ) {
      let Contact = {
        fname: contact.fname,
        lname: contact.lname,
        phone: contact.phone,
        email: contact.email,
        address: contact.address
      };
      await AsyncStorage.mergeItem(key, JSON.stringify(Contact))
        .then(() => {
          navigation.goBack();
        })
        .catch(eror => {
          console.log(error);
        });
    }
  };

  return (
<TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <Form>
            <Item style={styles.inputItem}>
              <Label>First Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={fname => setContact({...contact,fname})}
                value={contact.fname}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Last Name</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={lname => setContact({ ...contact,lname })}
                value={contact.lname}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Phone</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={phone => setContact({ ...contact,phone })}
                value={contact.phone}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Email</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={email => setContact({ ...contact,email })}
                value={contact.email}
              />
            </Item>
            <Item style={styles.inputItem}>
              <Label>Address</Label>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="default"
                onChangeText={address => setContact({ ...contact,address })}
                value={contact.address}
              />
            </Item>
          </Form>
          <Button
            full
            rounded
            style={styles.button}
            onPress={() => {
              updateContact(contact.key);
            }}
          >
            <Text style={styles.buttonText}>Update</Text>
          </Button>
        </View>
      </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10
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
  }
});
