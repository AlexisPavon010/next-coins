import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import "@material-tailwind/react/tailwind.css";
import Sidebar from '../components/Sidebar'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { auth } from '../firebase/client';
import Login from '../components/Login';
import nookies, { setCookie } from 'nookies';
import { useRouter } from 'next/router'
import connectDB from '../database';
import { initilaRoles } from './api/auth/libs/initialRoles';



function MyApp({ Component, pageProps, cookies }) {
  const router = useRouter()

  // console.log(cookies)


  const [showSidebar, setShowSidebar] = useState('-left-64');
  const [userFb, setUser] = useState(undefined)

  const guardarUsuario = (user) => {
    // console.log(user)
    setUser(user)

    setCookie(null, 'token', user, {
      maxAge: 30 * 24 * 60 * 60
    })

  }


  useEffect(() => {
    // auth.onAuthStateChanged(user => guardarUsuario(user))
    if (cookies.token) {
      setUser(cookies.token)
    }
    setShowSidebar('-left-64')
  }, [pageProps])

  if (userFb === {}) return <div className='bg-gray-800' ></div>
  else if (!userFb) return <Login />

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
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <div className="md:ml-64">
        <Component {...pageProps} />
      </div>
    </>
  )
}

MyApp.getInitialProps = async (appContext) => {
  const cookies = nookies.get(appContext.ctx);

  await connectDB()
  // await initilaRoles()

  return { cookies }
}

export default MyApp



