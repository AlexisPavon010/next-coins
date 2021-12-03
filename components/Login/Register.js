import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import InputIcon from '@material-tailwind/react/InputIcon';
import Button from '@material-tailwind/react/Button';
import { useState } from 'react';
import { auth, db } from '../../firebase/client';
import Head from 'next/head';
import axios from 'axios';



export default function Register({ setRegister }) {


    const [state, setUser] = useState(null)

    const handleInputChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setUser({ ...state, [name]: value })
    }

    const iniciarSesion = async () => {
        const { email, password } = state
        try {
            const res = axios.post('/api/user', {
                email: email,
                password: password
            })

            console.log(res)
            // await auth.createUserWithEmailAndPassword(email, password).then(userRegister => {
            //     db.collection('user').doc(userRegister.user.uid).set({
            //         token: userRegister.user.refreshToken,
            //         uid: userRegister.user.uid,
            //         email: userRegister.user.email,
            //         displayName: userRegister.user.displayName,
            //         creado: Date()
            //     })
            // })
        }
        catch (e) {
            alert(e)
        }
    }

    return (
        <>
            <Head>
                <title>Registrarse | Crypto Coins</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-gray-800  bg-cover bg-center w-screen h-screen relative flex flex-col justify-center">
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
                                {/* <div className="mb-8 px-4">
                                    <InputIcon
                                        type="password"
                                        color="lightBlue"
                                        placeholder="Password"
                                        iconName=""
                                        name='password'
                                        onChange={handleInputChange}
                                    />
                                </div> */}
                                {/* <div className="mb-4 px-4">
                                    <Checkbox
                                        color="lightBlue"
                                        text="Remember Me"
                                        id="remember"
                                    />
                                </div> */}
                            </CardBody>
                            <CardFooter>
                                <div className="flex justify-center mb-4  bg-bb">
                                    <Button
                                        onClick={iniciarSesion}
                                        color="lightBlue"
                                        buttonType="link"
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Registrarme
                                    </Button>

                                </div>
                                <div className="flex justify-center bg-bb">
                                    <p className='cursor-pointer' onClick={() => setRegister(false)} >Volver</p>
                                </div>
                                {/* <div className='flex justify-between'>
                                    <Button
                                        onClick={() => iniciarSesionProviders(googleAuthProvider)}
                                        color="lightBlue"
                                        buttonType="link"
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Google
                                    </Button>
                                    <Button
                                        onClick={() => iniciarSesionProviders(facebookAuthProvider)}
                                        color="lightBlue"
                                        buttonType="link"
                                        size="lg"
                                        ripple="dark"
                                    >
                                        Facebook
                                    </Button>
                                </div> */}
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}