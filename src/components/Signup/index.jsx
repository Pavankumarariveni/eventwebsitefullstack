import { Link,Navigate,useNavigate } from 'react-router-dom'
import './index.css'
import { useState } from 'react'
import Cookies from 'js-cookie'

const Signup = (props) => {
    const back = useNavigate()
    const [userData,setUserData] = useState({
        username: '',
        password: '',
        email: ''
    })

    const [invalidData,setInvalidData] = useState({
        errorMsg : '',
        showErrorMsg : false
    })

    const onSubmitFailure = (errorMsg) => {
        setInvalidData({
            errorMsg,
            showErrorMsg : true
        })
        setUserData({
            username: '',
            password: '',
            email: ''
        })
    } 

    const onSubmitSuccess = () => {
        setUserData({
            username: '',
            password: '',
            email: ''
        })
        back('/login')
    }

    const onSubmitSignup = async e => {
        e.preventDefault() 
        if (userData.username != ' ' && userData.password.length > 7) {
            setInvalidData({
                errorMsg : '',
                showErrorMsg : false
            })
            const url = 'https://authentication-ry06.onrender.com/signup'
            const options = {
                method: 'POST',
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body : JSON.stringify(userData)
            }
            const response = await fetch(url,options)
            const data = await response.json()
            if (response.ok) {
                onSubmitSuccess()
            }
            else {
                onSubmitFailure(data.status)
            }
            setUserData({
                username: '',
                password: '',
                email: ''
            })
        }}
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
        return <Navigate to="/"/>
    }

    return (
        <div className='login-page'>
            <div className='login-con'>
                <h1 className='logo'>BookUsNow</h1>
                <form onSubmit={onSubmitSignup}>
                    <div className='label-input-con'>
                        <label className='label'>E-Mail</label>
                        <input value={userData.email} onChange={e => setUserData({
                            username: userData.username,
                            password : userData.password,
                            email: e.target.value
                        })} className='input-area' type='email'placeholder='E-Mail'/>
                    </div>
                    <div className='label-input-con'>
                        <label className='label'>Username</label>
                        <input required value={userData.username} onChange={e => setUserData({
                            username: e.target.value,
                            password : userData.password,
                            email: userData.email
                        })} className='input-area' type='text'placeholder='Username'/>
                    </div>
                    <div className='label-input-con'>
                        <label className='label'>Password</label>
                        <input required value={userData.password} onChange={e => setUserData({
                            username: userData.username,
                            password : e.target.value,
                            email: userData.email
                        })} className='input-area' type='password' placeholder='Password'/>
                    </div>
                    <button className='login-btn' type='submit'>Sign Up</button>
                </form>
                <Link to="/login"><button className='login-btn signup-btn' type='submit'>Sign in</button></Link>
                {invalidData.showErrorMsg && <p className='error-msg'>*{invalidData.errorMsg}</p>}
            </div>
        </div>
    )
}

export default Signup