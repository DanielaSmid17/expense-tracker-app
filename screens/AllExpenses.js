import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-store';

export default function AllExpenses() {
    const expensesContext = useContext(ExpensesContext);

  return (
    <ExpensesOutput expenses={expensesContext.expenses} periodName='Total' fallbackText='No expenses registered found' />
  );
}


