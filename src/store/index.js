import { createSlice, configureStore} from '@reduxjs/toolkit'
import {v4} from "uuid";

import db from "./firebase";

const DATABASE = 'shrutlekha';
const TABLE = 'users'
const PK = 'mobile'
const ADMIN = '7977329292'


const initialState = {
    'mobile':'',
    'isLoggedIn':false,
    'token':'',
    'message':'',
    'registerMessage':'',
    'isAdmin': false    
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser (state, action) {
            state.mobile = action.payload.mobile
            state.token = action.payload.token
        },
        setLogin (state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
        },
        setMsg (state, action) {
            state.message = action.payload.message
        },
        setRegisterMsg (state, action) {
            state.registerMessage = action.payload.registerMessage
        },
        setAdmin (state, action) {
            state.isAdmin = action.payload.isAdmin
        }   
    }
  })
  

const store = configureStore({
    reducer: userSlice.reducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

const userActions = userSlice.actions

export const checkAuth = (authObj) =>{
    return async(dispatch, getState) =>{

        if(getState().token != authObj.token)
        {
            const token = v4()
            console.log(authObj.token)
            console.log(token)
            localStorage.setItem("getUserAuthToken", token);
            console.log(localStorage.getItem("getUserAuthToken"))
            db.ref(DATABASE).child(TABLE).child(getState().mobile).update({
                token: token
            })
        }
        dispatch(userActions.setLogin({
            'isLoggedIn':true
        }))

        
    }
}

export const isUserActive = (authObj) =>{
    return async(dispatch, getState) =>{
        console.log(getState().token)
        console.log(authObj.token)

        if(getState().token != authObj.token)
        {
            dispatch(userActions.setLogin({
                'isLoggedIn': false
            }))  
            
            dispatch(userActions.setUser({
                'mobile': '',
                'token': ''
            }))

            dispatch(userActions.setMsg({ 
                'message':'Another Session already active on this account'
            }))
            dispatch(userActions.setAdmin({
                'isAdmin': false
            }))
        }
    }
}

export const login = (userObj) =>{
    return async(dispatch) =>{
        
        db.ref(DATABASE).child(TABLE).orderByChild(PK).equalTo(userObj.mobile).on("value", (snapshot)=>{
            if(snapshot.exists())
            {
                const data = snapshot.val()
                const key = userObj.mobile
                
                if(data[key] && data[key].password === userObj.password)
                {
                    
                    dispatch(userActions.setUser({
                        'mobile': userObj.mobile,
                        'token': data[key].token
                    }))
                    dispatch(userActions.setMsg({ 'message':'Success'}))
                    if(key === ADMIN) dispatch(userActions.setAdmin({'isAdmin': true}))
                }
                else{
                    dispatch(userActions.setMsg({'message':'Invalid Password'}))
                }
            }
            else{
                dispatch(userActions.setMsg({'message':'User does not exist!'}))
            }
        }).catch((alert)=>{
            console.log(alert)
            dispatch(userActions.setMsg({
                'message':'User does not exist!'
            }))
        })
    } 
}

export const register = (userObj) =>{
    return async(dispatch) =>{
        
        db.ref(DATABASE).child(TABLE).orderByChild(PK).equalTo(userObj.mobile).on("value", (snapshot)=>{
            if(!snapshot.exists())
            {
                try
                {
                    const user = {
                        'mobile': userObj.mobile,
                        'fullName': userObj.fullName,
                        'password': Math.random().toString(36).substr(2, 8),
                        'token': v4()
                    }

                    db.ref(DATABASE).child(TABLE).child(user.mobile).set(user)
                
                    dispatch(userActions.setRegisterMsg({
                        'registerMessage':'user created successfully'
                    }))
                }
                catch(error){
                    console.log(error);
                    dispatch(userActions.setRegisterMsg({
                        'registerMessage':'error while creating user'
                    }))
                }
            }
            else{

                dispatch(userActions.setRegisterMsg({
                    'registerMessage':'user already exist!'
                }))
            }
        }).catch((alert)=>{
            console.log(alert)
            dispatch(userActions.setRegisterMsg({
                'registerMessage':'error while creating user'
            }))
        })
    }
}

export { userActions };
export default store;
