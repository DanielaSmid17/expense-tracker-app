import axios from 'axios';

const baseUrl = 'https://expense-tracker-app-bc096-default-rtdb.europe-west1.firebasedatabase.app';

export const storeExpense = async (expenseData) => {
    const res = await axios.post(`${baseUrl}/expenses.json`, expenseData);
    const id = res.data.name;
    return id;
}

export const fetchExpenses = async () => {
    const res = await axios.get(`${baseUrl}/expenses.json`);
    const expenses = [];
    for (const key in res.data) {
        const expenseObjet = {
            id: key,
            amount: res.data[key].amount,
            date: new Date(res.data[key].date),
            description: res.data[key].description
        };
        expenses.push(expenseObjet);
    }
    return expenses;
}

export const updateExpense = (id, expenseData) => {
    return axios.put(`${baseUrl}/expenses/${id}.json`, expenseData)
} 

export const deleteExpense = async ({id}) => {
    return axios.delete(`${baseUrl}/expenses/${id}.json`)

} 