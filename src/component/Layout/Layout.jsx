import React from 'react';
import {Header} from './Header/header'
import {Footer} from './Footer/footer'
import './styles/Layout.scss'


export default function Layout({children}) {
  return (
    <>
        <Header />
          {children && children}
        <Footer />
    </>
  )
}
