import { createContext, useReducer } from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

const expensesReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
            return [action.payload, ...state];
        case 'SET': 
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updatableExpenseIdx = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIdx];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIdx] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload.id)
        default: return state

    }

}

function ExpensesContextProvider ({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses})
    }

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData })

    }
    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: {id} })

    }
    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id, data: expenseData} })

    }

    const value = {
        expenses: expensesState,
        addExpense,
        deleteExpense,
        updateExpense,
        setExpenses
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;