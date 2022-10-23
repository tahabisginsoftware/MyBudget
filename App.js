import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert, useColorScheme } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

SplashScreen.preventAutoHideAsync();

function Home({navigation, route}){
  const {expenses, title, amount} = route?.params || {};

  const ListExpense = ({expense}) => {
    return(
      <View style={styles.itemContainer}>
        <Text style={{color: 'black',fontSize:20}}>{JSON.stringify(title)}</Text>
        <Text style={{color: 'black',fontSize:20}}>{expense?.title}</Text>
      </View>
    )
  };
  
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Balance</Text>
        <Text style={styles.balanceStyle}>5.987,34€</Text>
      </View>
      <View style={styles.Divider}></View>
      <View style={{justifyContent:'center', alignItems:'center',paddingTop:0, flex:1}}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 20, paddingBottom: 100}}
      >
      <View style={styles.itemContainer}>
        <View style={styles.dateContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>yesterday</Text>
        </View>
        <Text style={styles.amount}>{amount}</Text>
      </View>
      </ScrollView>
      </View>
      <View style={styles.footer}>
      <TouchableOpacity style={styles.AddButton} onPress={()=> navigation.navigate('AddExpense')}>
        <View style={styles.AddButton}><Icon name='add' size={30} color = 'white'/></View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

function AddExpense({navigation, route}){
  
  const [expenses, setExpenses] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState();

  const addExpensies = () =>{
    if(!title){
      Alert.alert('Error', "Please type a title!")
    }else if(!amount){Alert.alert('Error', "Please type an amount!")}
    else{
    setExpenses([...expenses, navigation.navigate("MyBudget",{
      id: Math.random(),
      title: title,
      amount: formatCurrency({ amount: amount, code: "EUR" }),
    })]);
    setTitle('');
    setAmount();
    }
  };
  return(
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.ExpenseTitle}>Add Expenses</Text>
      </View>
      <View style={styles.Divider}></View>
      <View style={{alignItems:'center', marginLeft: 5}}>
      <View style={styles.ExpenseContainer}>
        <Text style={{fontFamily:'InterRegular',fontSize:20}}>Title:</Text>
      <TextInput 
      placeholder="Title " 
      value={title} 
      onChangeText={setTitle} 
      textAlign={'right'}
      maxLength={20} 
      fontSize={20}/>
      </View>
      <View style={styles.ExpenseContainer}>
        <Text style={{fontFamily:'InterRegular',fontSize:20}}>Amount: </Text>
      <TextInput 
      placeholder="Amount " 
      value={amount} 
      onChangeText={setAmount} 
      keyboardType={'numeric'}
      
      textAlign={'right'}
      maxLength={10} 
      fontSize={20}/>
      </View>
      </View>
      <View style={styles.footerAddEdit}>
        <HideWithKeyboard>
      <TouchableOpacity style={styles.AddExpenseButton} onPress={addExpensies}>
        <Text style={{color:'white', fontSize:20, fontFamily:'InterRegular'}}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.CancelButton} onPress={()=> navigation.goBack()}>
        <Text style={{color:'white', fontSize:20, fontFamily:'InterRegular'}}>Cancel</Text>
      </TouchableOpacity>
      </HideWithKeyboard>
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
  paddingTop:30,
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
    bottom: 10,
    marginTop:20,
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
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    elevation: 40,
  },
  footerAddEdit:{
    position: 'absolute',
    bottom: 14,
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  itemContainer: {
    right: 5,
    width: 332,
    height: 70,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 12,
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
  },
  ExpenseContainer: {
    right: 5,
    width: 332,
    height: 70,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 12,
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontFamily: 'InterRegular'
  },
  amount: {
    color: '#37AF60',
    fontSize: 20,
    fontFamily: 'InterRegular',
  },
  negativeAmount: {
    color: '#C74141',
    fontSize: 20,
    fontFamily: 'InterRegular'
  },
  date:{
    fontSize:  15,
    color: '#616161'
  },
  dateContainer:{
    right:9,
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
});