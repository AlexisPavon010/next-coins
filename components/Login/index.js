import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import Register from './Register'
import { useState } from 'react';
import { auth, db, googleAuthProvider, facebookAuthProvider } from '../../firebase/client';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'



export default function Login() {

    const router = useRouter()

    const [state, setUser] = useState(null)
    const [register, setRegister] = useState(false)

    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setUser({ ...state, [name]: value })
    }

    const iniciarSesion = async () => {
        console.log(state)
        try {
            const res = await axios.post('https://next-crypto-topaz.vercel.app/api/user', {
                email: state.email,
                password: state.password
            })
            if (res.status === 200) {
                setCookie(null, 'token', res.data.token, {
                    maxAge: 30 * 24 * 60 * 60
                })
                router.reload(window.location.pathname)
            }

            console.log(res)
        } catch (error) {
            console.log(error)
        }

    }
    const mensajeClient = (message) => toast.warn(message, {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
    });

    const iniciarSesionProviders = async (provider) => {

        try {
            await auth.signInWithPopup(provider)
            const currentUser = await auth.currentUser
            const firebaseToken = await auth.currentUser.getIdToken()
            console.log(currentUser);
            await db.collection('user').doc(currentUser.uid).set({
                token: firebaseToken,
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName,
                photoURL: currentUser?.photoURL,
            })

        }
        catch (e) {

            var message = ""
            if (e.code === "auth/user-not-found") {
                message = "Email y contraseña no estan registrados o ha sido anulado."
            } if (e.code === "auth/invalid-email") {
                message = "No es un formato de correo correcto."
            } else {
                message = e.message
            }
            mensajeClient(message)
        }
    }

    if (register === true) return <Register setRegister={setRegister} />

    return (
        <>
            <Head>
                <title>Iniciar | Crypto Coins</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-login-background bg-cover bg-center w-screen h-screen relative flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="max-w-sm w-96">
                        <Card>
                            <ToastContainer />

                            <CardBody>
                                <div className="mb-12 px-4 bg-bb">
                                    <InputIcon
                                        type="email"
                                        color="lightBlue"
                                        placeholder="Email Address"
                                        iconName=""
                                        name='email'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-8 px-4">
                                    <InputIcon
                                        type="password"
                                        color="lightBlue"
                                        placeholder="Password"
                                        iconName=""
                                        name='password'
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4 px-4">

                                </div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex mb-8  justify-center bg-bb">
                                    <Button
                                        onClick={iniciarSesion}
                                        color="lightBlue"
                                        buttonType="filled"
                                        block={true}
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Ingresar
                                    </Button>
                                </div>
                                <div className='mb-4'>
                                    <Button
                                        onClick={() => iniciarSesionProviders(googleAuthProvider)}
                                        color="blueGray"
                                        buttonType="filled"
                                        size="lg"
                                        block={true}
                                        ripple="dark"
                                    >
                                        Google
                                    </Button>
                                </div>
                                {/* <div className='mb-4'>
                                    <Button
                                        onClick={() => iniciarSesionProviders(facebookAuthProvider)}
                                        color="blueGray"
                                        buttonType="filled"
                                        block={true}
                                        size="lg"
                                        ripple="ligth"
                                    >
                                        Facebook
                                    </Button>
                                </div> */}
                                <div className=''>
                                    <Button
                                        onClick={() => setRegister(true)}
                                        color="blueGray"
                                        buttonType="link"
                                        block={true}
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Registrarse
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}