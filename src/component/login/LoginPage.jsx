import React, { useState } from 'react';
import './styles/login.scss'
import Usericon from '../icon_components/usericon/icon';
import APIADRESS from '../../constant';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux';
import { useNavigate } from 'react-router-dom';
import Button from '../button/button';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remenber, setRemenber] = useState(false)
    const [errorLog, setErrorLog] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()


    async function handlesubmit(e) {
        e.preventDefault()
        const logInAdress = APIADRESS + '/user/login'
        const userInfo = APIADRESS + '/user/profile'
        const headerLogin = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': username,
                'password': password
            })
        }

        const tokenResponse = await fetch(logInAdress, headerLogin)
        const responseData = await tokenResponse.json()
        console.log(responseData);
        switch (responseData.status) {
            case 200:
                const token = responseData.body.token
                console.log(token);
                dispatch(setToken(token))

                const userInformation = await fetch(userInfo, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                const responseUserInfo = await userInformation.json()
                console.log(userInformation);
                const user = responseUserInfo.body
                dispatch(setUser(user))
                return navigate('/user');

            case 400:
                return setErrorLog(responseData.message);
            case 500:
                return setErrorLog(responseData.message)
            default:
                return setErrorLog('Erreur inattendu')
        }
    }



    return (
        <main className='main bg-dark'>
            <section className="sign-in-content">
                <Usericon />
                <h1>Sign In</h1>
                {errorLog ? <p className='errorMessage'>{errorLog}</p> : null}
                <form onSubmit={handlesubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label><input typeof="email" id="username" placeholder='E-mail' value={username} onChange={(e) => setUsername(e.target.value)} required={true} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label><input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" value={remenber} onChange={(e) => setRemenber(e.target.value)} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <Button clas={'sign-in-button'} text={'Sign in'} typename={'submit'}></Button>
                </form>
            </section>
        </main>
    );
}


