import {useContext, useLayoutEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IconButton from '../components/ui/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-store';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

export default function ManageExpense({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState()
    const expensesContext = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])


    const deleteExpenseHandler = async () => {
      setIsSubmitting(true)
      try {
        await deleteExpense(editedExpenseId)
        expensesContext.deleteExpense(editedExpenseId)
        navigation.goBack();
      } catch (error) {
            setIsSubmitting(false)
            setError('Could not delete expense - please try later!')
        }
      };
      
      const cancelHandler = () => {
        navigation.goBack();
      };
      const confirmHandler = async (expenseData) => {
        setIsSubmitting(true)
        try{

          if (isEditing) {
            expensesContext.updateExpense(editedExpenseId, expenseData);
            await updateExpense(editedExpenseId, expenseData)
          } else {
            const id = await storeExpense(expenseData)
            expensesContext.addExpense({...expenseData, id: id});
          }
          navigation.goBack();
        } catch (err) {
          setError('Could not save data - please try later again!')
          setIsSubmitting(false)
        }

    };

    const errorHandler = () => setError(null)

    const selectedExpense = expensesContext.expenses.find(expense => expense.id === editedExpenseId)

    if (error && !isSubmitting) return <ErrorOverlay message={error} onConfirm={errorHandler} />

    if (isSubmitting) return <LoadingOverlay />
  return (
    <View style={styles.container}>
        <ExpenseForm 
        onCancel={cancelHandler} 
        submitButtonLabel={isEditing ? 'Update' : 'Add'} 
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}  />
        {isEditing &&
        <View style={styles.deleteContainer}>
         <IconButton icon='trash' color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} />
         </View>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
