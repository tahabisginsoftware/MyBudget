import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';

SplashScreen.preventAutoHideAsync();

function Home({navigation, route}){
    const [expense, setExpenses] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [amount, setAmount] = React.useState();

  React.useEffect(()=>{
    loadExpense();
  },[]);
  React.useEffect(()=> {
    saveExpense(expense);
  },[expense]);
  const saveExpense = async expense =>{
    try {
      const stringifyToo = JSON.stringify(expense);
      await AsyncStorage.setItem('expense', stringifyToo);
      
    } catch (e) {
      // saving error
      console.log('error while saving!');
    }
};
  const loadExpense = async () => {
  try{
    const expense = await AsyncStorage.getItem("expense");
    if(expense != null){
      setExpenses(JSON.parse(expense));
    }
  }catch(error){
    console.log('error while loading!')
  }
};



  const ListItem = ({expen}) => {
    const rightSwipe = () =>{
      return(
        <TouchableOpacity
        onPress={() => deleteExpense(expen?.id)}>
        <View style={styles.deleteBox}>
          <Text style={{color:'white'}}>Delete</Text>
        </View>
        </TouchableOpacity>
      )
    }
    return (
      <Swipeable renderRightActions={rightSwipe}>
    <View style={[styles.itemContainer]}>
      <View style={{flex: 1}}>
      <Text style={styles.title}>
        {expen?.title}
        </Text>
        </View>
    <Text style={[styles.amount, 
      {color: '#395e66'}]}>{expen?.amount}</Text>
    </View>
    </Swipeable>
    );
  };
  
  const deleteExpense = (expenseId) => {
    const newExpense = expense.filter(item => item.id != expenseId);
    setExpenses(newExpense);
};
const clearAll = () => {
  Alert.alert('Warning', 'Are you sure to delete all Expenses?',[
    {text:'No'},
    {text: 'Yes', onPress:()=>setExpenses([])},
])};
  const addExpense = () =>{
      if(!title){
        Alert.alert('Error', "Please type a title!")
      }else if(!amount){Alert.alert('Error', "Please type an amount!")}
      else{
        const newExpense = {
          id: Math.random(),
          title: title,
          amount: formatCurrency({ amount: amount, code: "EUR" }),
        };
        setExpenses([...expense,newExpense]);
        setTitle('');
        setAmount();
        };
};


  
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.ExpenseTitle}>Expenses</Text>
        <TouchableOpacity onPress={clearAll}>
      <IonIcon name='trash-outline' size={40} color='red'/>
      </TouchableOpacity>
      </View>
      <View style={styles.Divider}></View>
      
      <FlatList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{padding: 20, paddingBottom: 100}} 
      data={expense}
      renderItem={({item}) => (<ListItem expen={item}/>)}
      />

      <View style={styles.footer}>
      <View style={styles.ExpenseContainer}>
      <TextInput 
      placeholder="Title " 
      value={title} 
      onChangeText={text => setTitle(text)} 
      maxLength={20} 
      fontSize={20}/>
      </View>
      <View style={styles.ExpenseContainer}>
      <TextInput 
      placeholder="Amount " 
      value={amount} 
      onChangeText={setAmount} 
      keyboardType={'numeric'}
      maxLength={10} 
      fontSize={20}/>
      </View>
      <TouchableOpacity style={styles.AddButton} onPress={addExpense}>
        <View style={styles.AddButton}><Icon name='add' size={30} color = 'white'/></View>
      </TouchableOpacity>
      </View>
    </View>
  );
}

function AddExpense({navigation, route}){}

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
  paddingTop:10,
  borderBottomColor: '#F0F0F0'
  },
  header:{
    paddingLeft:35,
    paddingTop:30,
    paddingRight:30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle:{
    fontSize: 20,
    fontFamily: 'InterMedium',
  },
  ExpenseTitle:{
    fontSize:36,
    fontFamily: 'InterBold'
  },
  AddButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    borderRadius: 35,
    backgroundColor: 'black',
    elevation: 5,
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
    flexDirection: 'row',
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
    left: 10,
    width: 300,
    height: 70,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    justifyContent: 'space-between',
    marginVertical: 10,
    borderRadius: 10,
  },
  ExpenseContainer: {
    right: 10,
    width: 332,
    height: 64,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,

    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    flex:1
  },
  title: {
    fontSize: 20,
    fontFamily: 'InterRegular'
  },
  amount: {
    fontSize: 20,
    fontFamily: 'InterRegular',
  },
  negativeAmount: {
    color: '#37AF60',
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
  },
  deleteBox:{
    backgroundColor: '#FF6666',
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
    height: 70,
    borderRadius: 10,
    top:10,
    padding: 20,
    elevation: 5,
  }
});