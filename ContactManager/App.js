import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import AddNewContactScreen from "./screens/AddNewContactScreen";
import EditContactScreen from "./screens/EditContactScreen";
import ViewContactScreen from "./screens/ViewContactScreen";


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
          headerStyle: {
    backgroundColor: "#BA2F16",
  },
  headerTintColor: "#fff",
  headerTitleStyle: {
    color: "#fff",
  }
      }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Contact App"}}/>
        <Stack.Screen name="Add" component={AddNewContactScreen} options={{title: "Add New Contact"}}/>
        <Stack.Screen name="Edit" component={EditContactScreen} options={{title: "Edit Contact"}}/>
        <Stack.Screen name="View" component={ViewContactScreen} options={{title: "View Contact"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
