import React, { useEffect, useReducer, useState } from 'react'
import jwt_decoded from 'jwt-decoded'
import  AsyncStorage  from '@react-native-community/async-storage'
import AuthReducer from '../reducers/Auth.reducer'
import { setCurrentUser } from '../actions/Auth.actions'
import AuthGlobal from './AuthGlobal'


const Auth = props =>{
    const [stateUser, dispatch] = useReducer(AuthReducer, {
        isAuthenticated:null,
        user:{}
    });
    const [showChild, setshowChild] = useState(false)
    useEffect(() => {
      setshowChild(true)
      if(AsyncStorage.jwt){
          const decoded=AsyncStorage.jwt? AsyncStorage.jwt:'';
          if(setshowChild){
              dispatch(setCurrentUser(jwt_decoded(decoded)))
          }
      }
    
      return () => {
        setCurrentUser(false)
      }
    }, [])

    if(!showChild){
        return null;
    }else{
        return(
            <AuthGlobal.Provider value={{ stateUser, dispatch}}>

            </AuthGlobal.Provider>
        )
    }
    
}

export default Auth