import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import Sidebar from '../components/Sidebar'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { app } from '../firebase/client';
import Login from '../components/Login';
import { parseCookies, setCookie, destroyCookie } from 'nookies'

function MyApp({ Component, pageProps }) {

  const [userFb, setUser] = useState(undefined)

  const guardarUsuario = (user) => {
    // console.log(user)
    setUser(user)
    setCookie(null, 'token', user?.uid, {
      maxAge: 30 * 24 * 60 * 60
    })

  }


  useEffect(() => {
    app.auth().onAuthStateChanged(user => guardarUsuario(user))
  }, [])

  if( userFb === undefined ) return <></>
  else if (!userFb) return <Login/>

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

export default MyApp
