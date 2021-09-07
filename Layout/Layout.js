import Sidebar from '../components/Sidebar'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { app } from '../firebase/client';
import Login from '../components/Login';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { recuperarUser, userState } from '../slices/userReducer';


export default function Layout({ Component, pageProps }) {

    
// const [state, setState] = useState(undefined)
    const dispatch = useDispatch()
    const userS = useSelector(userState)

    const guardarUsuario = (user) => {
        if (user == null) {
            return
        }
        else if (user) {
            const { email, uid, } = user
            dispatch(recuperarUser({ existe: true, email, uid }))
        }
    }


    useEffect(() => {
      const sessionSotage =  window.sessionStorage.getItem('session')

      if (sessionSotage) {
        // setState(true)
        guardarUsuario(JSON.parse(sessionSotage))
      }
        // app.auth().onAuthStateChanged(user => guardarUsuario(user))
    }, [])

    console.log(userS)
    // const sessionSotage =  window?.sessionStorage.getItem('session')
    // if (userS.loading === true) return <></>
     if (userS.length === 0) return <Login />

    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
                    integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
                    crossOrigin="anonymous"
                />
            </Head>
            <Sidebar />
            <div className="md:ml-64">
                <Component {...pageProps} />
            </div>
        </>
    )
}
