import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


export const login = createAsyncThunk('user/Login', async ({email,password}) =>{
    try {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
       }
       const {data} = await axios.post('/api/users/login',{email,password},config)
       return data
    }catch(error){
        return error.response.data
    }
})

export const register = createAsyncThunk('user/Register', async({name,email,password}) => {
    try{
        const config = {
            headers: {
                'Content-Type' : 'application/json',
            }
        }
        const {data} = await axios.post(
            '/api/users',
            {name, email, password},
            config
        )
        return data
    }catch(error){
        return error.response.data
    }
})

export const getUserDetails = createAsyncThunk('user/Details', async(id, {getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/users/${id}`, config)
        return data
    }catch(error){
        return error.response.data
    }
})

export const updateUserProfile = createAsyncThunk('user/Details', async(user, {getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
        const config = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.put('/api/users/profile',user, config)
        return data
    }catch(error){
        return error.response.data
    }
})

export const listUsers = createAsyncThunk('user/List', async(_,{getState}) => {
    try{
        const {
            userLogin: { userInfo },
          } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const { data } = await axios.get(`/api/users`, config)
        return data
        
    } catch (error) {
        return error.response.data
    }
})

export const deleteUser = createAsyncThunk('user/Delete', async(id, {getState}) =>{
    try{
        const {
            userLogin: { userInfo },
          } = getState()
      
        const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }

          const { data } = await axios.delete(`/api/users/${id}`, config)
          return data
    } catch (error) {
        return error.response.data
    }
})

// export const updateUser = createAsyncThunk('user/Update', async(user,{getState}) => {
//     try{
//         const {
//             userLogin: { userInfo },
//           } = getState()
      
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`,
//             },
//           }
//     }catch (error) {
//         return error.response.data
//     }
// })

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    userInfo: userInfoFromStorage,
    status: "idle",
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'User',
    initialState,
    reducers:{
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
            },
    },
   
    extraReducers:{
        [login.pending]: (state) => {
            state.loading = true
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload            
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})


const registerInitialState = {
    userInfo: userInfoFromStorage,
    status: "idle",
    error: null,
    loading: false,
} 

const registerSlice = createSlice({
    name: 'User',
    initialState: registerInitialState,

    reducers:{
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
            },
    },

    extraReducers:{
        [register.pending]: (state) => {
            state.loading = true
        },
        [register.fulfilled]: (state, action) => {
            state.loading = false;
            state.userInfo = action.payload            
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo))
        },
        [register.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

const detailInitialRegister = {
    user: {},
    status: "idle",
    error: null,
    loading: false,
} 

const userDetailSlice = createSlice({
    name: 'User',
    initialState:detailInitialRegister,  
    extraReducers:{
        [getUserDetails.pending]: (state) => {
            state.loading = true
        },
        [getUserDetails.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload            
        },
        [getUserDetails.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

const userUpdateInitialRegister = {
    user: null,
    status: "idle",
    error: null,
    loading: false,
} 

const userUpdateDetail = createSlice({
    name: 'User',
    initialState:userUpdateInitialRegister,  
    extraReducers:{
        [updateUserProfile.pending]: (state) => {
            state.loading = true
        },
        [updateUserProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.user = action.payload            
        },
        [updateUserProfile.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

const userListSlice = createSlice({
    name: "UsersList",
    initialState: {
        users: [],
        loading:false,
    },
    reducers:{
      usersReset : (state) => {
        state.users = []
      }
    },
    extraReducers: {
        [listUsers.pending]: (state) => {
            state.loading = true
        },
        [listUsers.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload            
        },
        [listUsers.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }
})

const userDeleteSlice = createSlice({
    name:'userDelete',
    initialState: {
        success:false
    },
    extraReducers: {
        [deleteUser.pending]: (state) => {
            state.loading = true
        },
        [deleteUser.fulfilled]: (state) => {
            state.loading = false;
            state.success = true            
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
    }

})

export const {logout} = userSlice.actions
export const {usersReset} = userListSlice.actions
export { userSlice , registerSlice, userDetailSlice, userUpdateDetail, userListSlice, userDeleteSlice }
