import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/ui/IconButton';
import {Ionicons} from '@expo/vector-icons'
import ExpensesContextProvider from './store/expenses-store';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
  return(
    <BottomTabs.Navigator 
    screenOptions={({navigation})=> ({
      headerStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      headerTintColor: 'white',
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (<IconButton icon='add' color={tintColor} size={24} onPress={()=> {navigation.navigate('ManageExpense')}} />)
      
    })}>
      <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size})=> (
          <Ionicons name='hourglass' size={size} color={color}  />
          )
      }} 
      />
      <BottomTabs.Screen 
        name='AllExpenses' 
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({color, size})=> (
            <Ionicons name='calendar' size={size} color={color} />
            )
        }}  />
    </BottomTabs.Navigator>
  )
}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>

      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
          
        }}>
          <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{headerShown: false}} />
          <Stack.Screen name="ManageExpense" component={ManageExpense} options={{presentation: 'modal'}} />
        </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  
});
