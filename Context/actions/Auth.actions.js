import jwt_decode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'
import Toast from 'react-native-toast-message'
import baseUrl from '../../assets/common/baseUrl'

export const SET_CURRENT_USER = "SET_CURRENT_USER"

export const loginUser= (user, dispatch)=>{
    fetch(`${baseUrl}users/login`,{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            Accept:'application/json',
            'Comtemt-Type':"application/json"
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data){
            const token=data.token;
            AsyncStorage.setItem('jwt',token)
            const decoded=jwt_decode(token)
            dispatch(setCurrentUser(decoded,user))
        }else{
            logoutUser(dispatch)
        }
    })
    .catch((err)=>{
        Toast.show({
            topOffset:60,
            type:'error',
            text1:'Please provide the right credentials',
            text2:''
        })
        logoutUser(dispatch)
    })
}

export const getUserProfile=()=>{
    fetch(`${baseUrl}users/${id}`,{
        method:'GET',
        body:JSON.stringify(user),
        headers:{
            Accept:'application/json',
            'Comtemt-Type':"application/json"
        }
    })
    .then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>{
        Toast.show({
            topOffset:60,
            type:'error',
            text1:'Please provide the right credentials',
            text2:''
        })

    })
}

export const logoutUser=(dispatch)=>{
    AsyncStorage.removeItem('jwt')
    dispatch(setCurrentUser())
}

export const setCurrentUser=(decoded, user)=>{
    return{
        type: SET_CURRENT_USER,
        payload:decoded,
        userProfile:user
    }
}