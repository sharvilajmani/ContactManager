import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView,Linking, TouchableOpacity, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Entypo} from "@expo/vector-icons";
import {Card, CardItem} from "native-base";

export default function ViewContactScreen({navigation, route}) {
const [contact, setContact] = useState({
  fname: "DummyText",
  lname: "DummyText",
  phone: "DummyText",
  email: "DummyText",
  address: "DummyText",
  key: "DummyText"
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

let callAction = phone => {
  let phoneNumber = phone;
  if (Platform.OS !== "android") {
    phoneNumber = `telpromt:${phone}`;
  } else {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

let smsAction = phone => {
  let phoneNumber = phone;
  phoneNumber = `sms:${phone}`;
  Linking.canOpenURL(phoneNumber)
    .then(supported => {
      if (!supported) {
        Alert.alert("Phone number is not available");
      } else {
        return Linking.openURL(phoneNumber);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

let editContact = key => {
  navigation.navigate("Edit", { key: key });
};

let  deleteContact = key => {
  Alert.alert("Delete Contact ?", `${contact.fname} ${contact.lname}`, [
    {
      text: "Cancel",
      onPress: () => console.log("cancel tapped")
    },
    {
      text: "OK",
      onPress: async () => {
        await AsyncStorage.removeItem(key)
          .then(() => {
            navigation.goBack();
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  ]);
};

  return (
<ScrollView style={styles.container}>
        <View style={styles.contactIconContainer}>
          <Text style={styles.contactIcon}>
            {contact.fname[0].toUpperCase()}
          </Text>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>
              {contact.fname} {contact.lname}
            </Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Phone</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{contact.phone}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>email</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{contact.email}</Text>
            </CardItem>
          </Card>
          <Card>
            <CardItem bordered>
              <Text style={styles.infoText}>Address</Text>
            </CardItem>
            <CardItem bordered>
              <Text style={styles.infoText}>{contact.address}</Text>
            </CardItem>
          </Card>
        </View>
        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                smsAction(contact.phone);
              }}
            >
              <Entypo name="message" size={50} color="#B83227" />
            </TouchableOpacity>
          </CardItem>

          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                callAction(contact.phone);
              }}
            >
              <Entypo name="phone" size={50} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
        </Card>

        <Card style={styles.actionContainer}>
          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                editContact(contact.key);
              }}
            >
              <Entypo name="edit" size={50} color="#B83227" />
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>
          </CardItem>

          <CardItem style={styles.actionButton} bordered>
            <TouchableOpacity
              onPress={() => {
                deleteContact(contact.key);
              }}
            >
              <Entypo name="trash" size={50} color="#B83227" />
            </TouchableOpacity>
          </CardItem>
        </Card>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  contactIconContainer: {
    height: 200,
    backgroundColor: "#B83227",
    alignItems: "center",
    justifyContent: "center"
  },
  contactIcon: {
    fontSize: 100,
    fontWeight: "bold",
    color: "#fff"
  },
  nameContainer: {
    width: "100%",
    height: 70,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    position: "absolute",
    bottom: 0
  },
  name: {
    fontSize: 24,
    color: "#000",
    fontWeight: "900"
  },
  infoText: {
    fontSize: 18,
    fontWeight: "300"
  },
  actionContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  actionText: {
    color: "#B83227",
    fontWeight: "900"
  }
});
