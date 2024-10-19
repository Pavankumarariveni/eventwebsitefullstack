import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Cookies from 'js-cookie'


import './index.css'

const Login = () => {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errorData,setErrorData] = useState({
        errorMsg: '',
        isShowErrorMsg : false
    })
    
    const onSuccess = jwtToken => {
        setErrorData({
            errorMsg: '',
            isShowErrorMsg: false
        })
        Cookies.set('jwt_token', jwtToken, {expires: 10})
    }

    const onFailure = errorMsg => {
        setErrorData({
            errorMsg,
            isShowErrorMsg: true
        })
    }
    

    const onSubmitLoginForm = async e => {
        e.preventDefault()
        const userDetails = {username,password}
        const url = 'https://authentication-ry06.onrender.com/login'
        const options = {
            method: 'POST',
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body : JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if (response.ok) {
            onSuccess(data.jwtToken);
        }
        else {
            onFailure(data.status);
        }
        setUsername('')
        setPassword('')        
    }
    
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
        return <Navigate to="/"/>
    }

    return (
        <div className='login-page'>
            <div className='login-con'>
                <h1 className='logo'>BookUsNow</h1>
                <form onSubmit={onSubmitLoginForm}>
                    <div className='label-input-con'>
                        <label className='label'>Username</label>
                        <input required value={username} onChange={e => setUsername(e.target.value)} className='input-area' type='text'placeholder='Username'/>
                    </div>
                    <div className='label-input-con'>
                        <label className='label'>Password</label>
                        <input required value={password} onChange={e => setPassword(e.target.value)} className='input-area' type='password'placeholder='Password'/>
                    </div> 
                    <button className='login-btn' type='submit'>Login</button>
                </form>
                <Link to="/signup"><button className='login-btn signup-btn' type='submit'>Sign up</button></Link>
                {errorData.isShowErrorMsg && <p className='error-msg'>*{errorData.errorMsg}</p>}
            </div>
        </div>
    )
}

export default Login