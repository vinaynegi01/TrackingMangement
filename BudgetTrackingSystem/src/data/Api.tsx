import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:4000/api"
});

export const SignUpUser = (data:any) => {
    return api.post(`/SignUpUser`,data)
}

export const LoginUser = (data:any) => {
    return api.post(`/LoggingUser`,data)
}

export const AddExpens = (data:any) => {
    return api.post(`/addexpense`,data)
}

export const AddBudget = (data:any) => {
    return api.post(`/addbudget`,data)
}

export const updateBudget = (data:any)=>{
    return api.post(`/update-budget`,data)
}

export const getallExpense = (id:any)=>{
    return api.get(`/get-all-expense/${id}`)
}


export const expenseUser = (id:any)=>{
    return api.get(`/all-expense-user/${id}`)
}

export const financelDashBoard = (id:any)=>{
    return api.get(`/financel-dashboard/${id}`)
}

export const GetParticularexpense = (id:any)=>{
    return api.get(`/get-particular-budget/${id}`)
}

export const updateExpense = (id:any,data:any)=>{
    return api.post(`/update-expense/${id}`,data)
}

export const deleteExpense = (id:any)=>{
    return api.delete(`/delete-expense/${id}`)
}