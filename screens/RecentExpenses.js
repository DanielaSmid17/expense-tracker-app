import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-store';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

export default function RecentExpenses() {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()
    const expensesContext = useContext(ExpensesContext);


    useEffect(() => {
      async function getExpenses () {
        setIsFetching(true)
        try{
          const expenses = await fetchExpenses();
          expensesContext.setExpenses(expenses)
        } catch(e){
          setError('Could not fetch expenses')
        }
        setIsFetching(false)
      };

      getExpenses();
    }, []);

    const errorHandler = () => setError(null)
    

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today, 7);
        return (expense.date >= date7daysAgo) && (expense.date <= today)
    })

    if (error && !isFetching) return <ErrorOverlay message={error} onConfirm={errorHandler} />
   if (isFetching) {
     return <LoadingOverlay />
    };
   
  return (
    <ExpensesOutput expenses={recentExpenses} periodName='Last 7 Days' fallbackText='No expenses registered for the last 7 days' />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
