import { View, Text, StyleSheet } from 'react-native';
import Input from './Input';
import { useState } from 'react';
import Button from '../ui/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({onCancel, submitButtonLabel, onSubmit, defaultValues}) => {
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues ? defaultValues.amount.toString() : '', isValid: true }, 
        date: {value: defaultValues ? getFormattedDate(defaultValues.date) : '', isValid: true } , 
        description: {value: defaultValues ? defaultValues.description : '',  isValid: true }
    })


    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid

    const inputChangeHandler = (inputIdentifier, enteredValue) => {
        setInputs((currentinputs)=> {
            return {... currentinputs, [inputIdentifier]: {value: enteredValue, isValid: true}}
        });
    }
    const sumbitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }
        
        const amountIsValid = !isNaN (expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;


        if (!amountIsValid || !dateIsValid || !descriptionIsValid){
            setInputs((currentinputs) => {
                return {
                    amount: {value: currentinputs.amount, isValid: amountIsValid},
                    date: {value: currentinputs.date, isValid: dateIsValid},
                    description: {value: currentinputs.description, isValid: descriptionIsValid}
                }
            })
            return;

        } 

        onSubmit(expenseData)
    }
  return (
    <View style={styles.form}>
        <Text style={styles.title}>Your expense</Text>
        <View style={styles.inputsRow}>
            <Input label='Amount' 
                style={styles.rowInput}
                invalid={!inputs.amount.isValid}
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }} />
            <Input label='Date' 
                style={styles.rowInput}
                invalid={!inputs.date.isValid}
                textInputConfig={{
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value,
                placeholder: 'YYYY-MM-DD',
                maxLength: 10
                }} />
        </View>
      <Input label='Description'
            invalid={!inputs.description.isValid}
            textInputConfig={{
            multiline: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
      }}/>
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data</Text>}
      <View style={styles.buttonsContainer}>
            <Button mode='flat' onPress={onCancel} style={styles.button} >Cancel</Button>
            <Button 
            onPress={sumbitHandler} 
            style={styles.button}>{submitButtonLabel}</Button>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  rowInput: {
    flex: 1, 
  },
  form: {
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 24
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error50,
    margin: 8
  }
});

export default ExpenseForm;