import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

SplashScreen.preventAutoHideAsync();

function Home({navigation}){
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Balance</Text>
        <Text style={styles.balanceStyle}>5.987,34€</Text>
      </View>
      <View style={styles.Divider}></View>
      <View style={{justifyContent:'center', alignItems:'center',paddingTop:50}}>
      <Text style={{fontFamily:'InterMedium'}}>ScrollView or Listview idk :/</Text>
      </View>
      <View style={styles.footer}>
      <TouchableOpacity style={styles.AddButton} onPress={()=> navigation.navigate('AddExpense')}>
        <View style={styles.AddButton}><Icon name='add' size={30} color = 'white'/></View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

function AddExpense({navigation}){
  return(
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.ExpenseTitle}>Add Expenses</Text>
      </View>
      <View style={styles.Divider}></View>
      <View style={styles.footerAddEdit}>
      <TouchableOpacity style={styles.AddExpenseButton} onPress={()=> navigation.goBack()}>
        <Text style={{color:'white', fontSize:20, fontFamily:'InterRegular'}}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.CancelButton} onPress={()=> navigation.goBack()}>
        <Text style={{color:'white', fontSize:20, fontFamily:'InterRegular'}}>Cancel</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const Stack = createStackNavigator();

function Stacks() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyBudget"
        component={Home}
        options={{
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle:{fontFamily:'InterBold', fontSize: 20},
          headerStyle: { backgroundColor: 'black' },
        }}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpense}
        options={{ 
          headerLeft: ()=> null,
          headerTitle: 'MyBudget',
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle:{fontFamily:'InterBold', fontSize: 20},
          headerStyle: { backgroundColor: 'black' }, 
        }}
      />
    </Stack.Navigator>
  );
}

export default function App(){

  const [fontsLoaded] = useFonts({
    'InterBold': require('./assets/fonts/InterBold.ttf'),
    'InterMedium': require('./assets/fonts/InterMedium.ttf'),
    'InterRegular': require('./assets/fonts/InterRegular.ttf'),
  });

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  return (
        <NavigationContainer>
          <Stacks/>
          <StatusBar style="light"/>
        </NavigationContainer>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  Divider:{
  borderBottomWidth:1, 
  width:"100%",
  paddingTop:36.5,
  borderBottomColor: '#F0F0F0'
  },
  header:{
    paddingLeft:35,
    paddingTop:30,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTitle:{
    fontSize: 20,
    fontFamily: 'InterMedium',
  },
  ExpenseTitle:{
    paddingBottom:18.5,
    fontSize:36,
    fontFamily: 'InterBold'
  },
  AddButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: 'black',
    elevation: 40,
    justifyContent: 'center',
  },
  AddExpenseButton:{
    width: 360,
    height: 70,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'black',
    top:14
  },
  CancelButton:{
    width: 360,
    height: 70,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: '#FF6666',
    top:14
  },
  balanceStyle:{
    bottom:5,
    fontSize: 32,
    fontFamily: 'InterMedium',
    color:'#37AF60'
  },
  
  footer:{
    position: 'absolute',
    bottom: 14,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  footerAddEdit:{
    position: 'absolute',
    bottom: 14,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});