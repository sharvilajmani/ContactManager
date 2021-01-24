import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {Entypo} from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from "native-base";
export default function HomeScreen({navigation}) {
const [data, setData] = useState([]);

useEffect(() => {
    navigation.addListener("focus", () => {
        getAllContact();
    })
});

let getAllContact = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        //console.log(keys);
        return AsyncStorage.multiGet(keys)
          .then(result => {
            setData(
              result.sort(function(a, b) {
                if (JSON.parse(a[1]).fname < JSON.parse(b[1]).fname) {
                  return -1;
                }
                if (JSON.parse(a[1]).fname > JSON.parse(b[1]).fname) {
                  return 1;
                }
                return 0;
              })
            );
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <View style={styles.container}>
      <FlatList 
          data = {data}
          keyExtractor = {(item,index) => item[0].toString()}
          renderItem = {({item}) => {
              contact = JSON.parse(item[1]);
              return(
                  <TouchableOpacity onPress={() => {navigation.navigate("View",{
                    key: item[0].toString()
                  })}}>
                    <Card style={styles.listItem}>
                      <View style={styles.iconContainer}>
                        <Text style={styles.contactIcon}>
                          {contact.fname[0].toUpperCase()}
                        </Text>
                      </View>
                      <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>
                          {contact.fname} {contact.lname}
                        </Text>
                        <Text style={styles.infoText}>
                          {contact.phone}
                        </Text>
                      </View>
                    </Card>
                  </TouchableOpacity>
              )
          }}
      />  
      <TouchableOpacity style={styles.floatButton} onPress = {() => navigation.navigate('Add')}>
          <Entypo name="plus" size={30} color="#fff" />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    listItem: {
      flexDirection: "row",
      padding: 20
    },
    iconContainer: {
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#B83227",
      borderRadius: 100
    },
    contactIcon: {
      fontSize: 28,
      color: "#fff"
    },
    infoContainer: {
      flexDirection: "column"
    },
    infoText: {
      fontSize: 16,
      fontWeight: "400",
      paddingLeft: 10,
      paddingTop: 2
    },
    floatButton: {
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.2)",
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      position: "absolute",
      bottom: 10,
      right: 10,
      height: 60,
      backgroundColor: "#B83227",
      borderRadius: 100
    }
  });
