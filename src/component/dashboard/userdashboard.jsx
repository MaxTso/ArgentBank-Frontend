import React, { useEffect, useState } from 'react'
import './styles/userdashboard.scss'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../button/button'
import APIADRESS from '../../constant';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux';


export default function Userdashboard() {
  const { firstName, lastName, userName } = useSelector((state) => state.User)
  const auth = useSelector((state) => state.Auth)
  const [editmode, setEditMode] = useState(false)
  const [userNameValue, setUserNameValue] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleClickEdit(e) {
    e.preventDefault()
    setEditMode(!editmode)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const adress = APIADRESS + '/user/profile'
    const fetchinfo = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.token}`
      },
      body: JSON.stringify({
        'userName': userNameValue
      })
    }
    try {
      const changeUsername = await fetch(adress, fetchinfo)
      const userNameResponse = await changeUsername.json()
      const newUsername = userNameResponse.body
      console.log(newUsername);
      dispatch(setUser(newUsername))
      setUserNameValue('')
      setEditMode(!editmode)
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!firstName) {
      navigate('/sign-in')
    }
  })

  return (
    <main className='main bg-dark'>

      {!editmode ?
        <div className="header">
          <h1>Welcome back<br />{!userName ? `${firstName} ${lastName}` : userName}!</h1>
          <Button clas={'edit-button'} text={'Edit Name'} click={handleClickEdit}></Button>
        </div>
        :
        <div className='header'>
          <h1>Edit user info</h1>

          <form onSubmit={handleSubmit}>
            <div className="entry">
              <label htmlFor="username">Username:</label>
              <input type="text" name="username" id="username" className='userinfo' value={userNameValue} onChange={(e) => setUserNameValue(e.target.value)} required={true} />
            </div>

            <div className="entry">
              <label htmlFor="firstname">First name:</label>
              <input type="text" name="firstname" id="firstname" className='userinfo' value={firstName} disabled={true} />
            </div>

            <div className="entry">
              <label htmlFor="lastname">Last name:</label>
              <input type="text" name="lastname" id="lastname" className='userinfo' value={lastName} disabled={true} />
            </div>

            <div className="buttons">
              <Button clas={'formEditUsernameButton'} text={'Save'} typename={'submit'}></Button>
              <Button clas={'formEditUsernameButton'} text={'Cancel'} click={handleClickEdit}></Button>
            </div>
          </form>
        </div>

      }

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>

        <div className="account-content-wrapper cta">
          <Button clas={'transaction-button'} text={'View transactions'}></Button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <Button clas={'transaction-button'} text={'View transactions'}></Button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>

        <div className="account-content-wrapper cta">
          <Button clas={'transaction-button'} text={'View transactions'}></Button>
        </div>
      </section>

    </main>
  )
}
