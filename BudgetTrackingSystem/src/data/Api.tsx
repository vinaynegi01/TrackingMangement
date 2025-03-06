import axios from "axios";


const api = axios.create({
    baseURL:"http://localhost:4000/api"
});

// export const fetchPosts = (pageNumber) => {
//     return api.get(`/posts?_start=${pageNumber}&_limit=3`)
// }

// export const fetchIndv = (id) =>{
//     return api.get(`/posts/${id}`)
// }

// export const deletePost=(id) => {
//     return api.delete(`/posts/${id}`)
// }

// export const updatePost=(id) => {
//     return api.put(`/posts/${id}`,{title:"title changed sucessfully."})
// }

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