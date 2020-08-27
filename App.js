import React, {createContext, useReducer} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Constants from 'expo-constants';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
//redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer, initialState} from './reducers/reducer'

//redux
//const store = createStore(reducer)

// context api creating context
export const Mycontext = createContext();

const Stack = createStackNavigator();

const myOptions = {
  
    title: "My Sweet Home",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#0A79DF"
    }
}

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={myOptions}
        />
        <Stack.Screen 
        name="Create" 
        component={CreateEmployee} 
        options={{...myOptions, title: "Create Employee"}}
        />
        <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{...myOptions, title: "Profile"}}
        />
      </Stack.Navigator>
    </View>
  );
}

// REDUX WAY
// export default () => {
//   return (
//     <Provider store = {store}>
//     <NavigationContainer>
//       <App />
//     </NavigationContainer>
//     </Provider>
//   )
// }

// CONTEXT API WAY
export default () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Mycontext.Provider value={
      {state, dispatch}
    }>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Mycontext.Provider>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
