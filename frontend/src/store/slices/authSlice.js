import {createSlice} from '@reduxjs/toolkit'

// creating initialstate...
const storedUser = localStorage.getItem("user");

const initialState = {
  user:
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null,

  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state,action)=>{
            const {user,token}=action.payload
            state.user= user
            state.token= token
            localStorage.setItem('token',token)
            localStorage.setItem('user',JSON.stringify(user))

        },
          updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            localStorage.setItem('user', JSON.stringify(state.user));
        },
        logout: (state)=>{
            state.user=null
            state.token=null
            localStorage.removeItem('token')
            localStorage.removeItem('user')

        },
        setLoading: (state,action)=>{
            state.loading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        }
          
    }
})


export const {setCredentials,logout,setLoading,setError,updateUser}=authSlice.actions
export default authSlice.reducer

export const selectUser= (state)=> state.auth.user
export const selectToken= (state)=> state.auth.token
export const selectLoading= (state)=> state.auth.loading
export const selectError= (state)=> state.auth.error