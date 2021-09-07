import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import InputIcon from '@material-tailwind/react/InputIcon';
import Checkbox from '@material-tailwind/react/Checkbox';
import Button from '@material-tailwind/react/Button';
import Register from './Register'
import { useState } from 'react';
import { app, db, googleAuthProvider, facebookAuthProvider } from '../firebase/client';
import Head from 'next/head';
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../slices/userReducer';


export default function Login({ children }) {

    const [user, setUser] = useState(null)
    const [register, setRegister] = useState(false)
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }

    const iniciarSesion = async () => {
        const { email, password } = user
        try {
            const userServer = await axios.get('/api/users') 

            const userResult = userServer.data.find( user => user.email === email );

            if(userResult === undefined) {
                alert('Usuario no Encontrado')
                setUser(null)
            }

            else {
                dispatch(addUser(userResult))
                // console.log(userResult)
            }


            // const currentUser = await app.auth().currentUser
            // const firebaseToken = await app.auth().currentUser.getIdToken()
            // console.log(currentUser);
            // await db.collection('user').doc(currentUser.uid).set({
            //     token: firebaseToken,
            //     uid: currentUser.uid,
            //     email: currentUser.email,
            // })

        }
        catch (e) {
            alert(e)
        }
    }
    const iniciarSesionProviders = async (provider) => {

        try {
            await app.auth().signInWithPopup(provider)
            const currentUser = await app.auth().currentUser
            const firebaseToken = await app.auth().currentUser.getIdToken()
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
            alert(e)
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
                            {/* <CardHeader color="lightBlue">
                        <H5 color="white" style={{ marginBottom: 0 }}>
                            Login
                        </H5>
                    </CardHeader> */}

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
                                    {/* <Checkbox
                                        color="lightBlue"
                                        text="Remember Me"
                                        id="remember"
                                    /> */}
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
                                <div className='mb-4'>
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
                                </div>
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