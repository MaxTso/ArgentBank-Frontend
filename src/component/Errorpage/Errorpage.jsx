import React from 'react'
import './styles/Errorpage.scss'

export default function Errorpage() {
    return (
        <main className='main bg-dark'>
            <div className="error">
                <h1>404 ERROR</h1>
                <p>La page que vous cherchez n'existe pas</p>
            </div>
        </main>
    )
}
