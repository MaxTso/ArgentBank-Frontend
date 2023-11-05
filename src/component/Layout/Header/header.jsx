import React from 'react'
import './styles/header.scss'
import logo from '../../../assets/img/argentBankLogo.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Usericon from '../../icon_components/usericon/icon'
import Logouticon from '../../icon_components/logout_icon/logout_icon'
import { useDispatch, useSelector } from 'react-redux'
import { clearToken, clearUser } from '../../../redux'


export function Header() {
  const { firstName, userName } = useSelector(state => state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  function handleSignOut(e) {
    e.preventDefault(e)
    dispatch(clearToken())
    dispatch(clearUser())
    navigate('/sign-in')
  }

  return (
    <header>
      <nav>
        <Link to={"/"} className='header__logo'>
          <img src={logo} alt='logo argentbank' />
        </Link>
        {!firstName ?
          <Link to='/sign-in' className='header__button'>
            <Usericon />
            <p>Sign In</p>
          </Link>
          :
          <div className="menu__container">

            <Link className='header__button' to='/user'>
              <Usericon />
              <p>{!userName ? firstName : userName}</p>
            </Link>

            <div className="header__button" onClick={handleSignOut}>
              <Logouticon />
              <p>Sign out</p>
            </div>

          </div>
        }
      </nav>
    </header>
  )
}
