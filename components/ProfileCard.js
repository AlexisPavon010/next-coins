import Card from '@material-tailwind/react/Card';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import Image from '@material-tailwind/react/Image';
import Head from 'next/head';
import Icon from '@material-tailwind/react/Icon';
import LeadText from '@material-tailwind/react/LeadText';
import Button from '@material-tailwind/react/Button';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useEffect, useRef, useState } from 'react';
import { auth, db, storage } from '../firebase/client';
import Input from '@material-tailwind/react/Input';
import axios from 'axios';

export default function ProfileCard({ userFb }) {

    const [state, setState] = useState(estadoInicial)
    // const usera = useGetUserSession();
    const [user, setUser] = useState(undefined)
    // const [state, setBacken] = useState(null)

    const estadoInicial = {
        displayName: user?.displayName,
        emal: user?.email
    }


    useEffect(() => {
        auth.onAuthStateChanged(user => setUser(user))
    }, [])


    // const [realTimeData, loadig, error] = useCollection(
    //     db.collection(user.uid).doc('userConfig')
    // )

    // console.log(realTimeData?.data())



    // SubirImage
    const [file, setFile] = useState(null)

    const filePikerRef = useRef(null)

    const DocChangeValue = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            console.log(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            // console.log(readerEvent.target.result)
            // setFile(readerEvent.target.result)
            subirImagenDb(readerEvent.target.result)
        }
        // console.log(file)
        // subirImagenDb(e.target.files[0])
    }

    const cuandoCambiaElInput = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        // console.log(name, value)
        setState({ ...state, [name]: value })

    }

    const enviarAlServidor = async (e) => {
        e.preventDefault()

        const res = await axios.post('/api/user/UserSettingForm', {
            data: state,
            user: user?.uid
        })

        if (res.status === 200) {
            //setState(estadoInicial)
            console.log()
        }

        console.log(res)

    }
    
    const subirImagenDb = async (archivo) => {
        console.log('ejecuto')
        db.collection(userFb.uid).doc('userConfig').get()
            .then(doc => {
                // console.log(doc)
                // console.log(archivo)
                if (archivo) {
                    // var metadata = {
                    //     contentType: archivo.type,
                    // };
                    const task = storage.ref(`imagenes-subidas/${user.uid}`).putString(archivo, 'data_url')
                    console.log('Db uploading')
                    // setWork(initialState)
                    setFile(null)
                    task.on('state_changed',
                        null,
                        (err) => {
                            console.log(err)
                        },
                        () => {
                            // notify()
                            storage.ref(`imagenes-subidas/${user.uid}`).getDownloadURL().then(url => {
                                console.log(url)
                                db.collection('user').doc(user.uid).set({
                                    photoURL: url
                                },
                                    { merge: true })
                            })
                            console.log('document uploading')
                        }
                    )
                }
            }
            )
    }

    const OpenFile = (e) => {
        e.preventDefault()
        filePikerRef.current.click()
        console.log(filePikerRef.current)
    }


    return (
        <>
            <Head>
                <title>Perfil Usuario | Crypto Coins</title>
            </Head>
            <Card>
                <form>
                    <div className="flex flex-wrap justify-center">
                        <div onClick={() => filePikerRef.current.click()} className="w-48 px-4  -mt-20 cursor-pointer">
                            <Image style={{ height: "160px" }} className='object-cover' src={'https://bridgemotorsbucket.s3.amazonaws.com/static/images/Home/user_men.png'} rounded raised />

                            <input
                                type='file'
                                onChange={DocChangeValue}
                                ref={filePikerRef}
                                hidden
                            />
                        </div>
                        <div className="w-full flex justify-center py-4 lg:pt-4 pt-8">
                            <div className="p-4 text-center">
                                <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                    ARS 1000000.00
                                </span>
                                <span className="text-sm text-gray-700">Invertido</span>
                            </div>
                            <div className="p-4 text-center">
                                <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                    ARS 30000.00
                                </span>
                                <span className="text-sm text-gray-700">Ganancias</span>
                            </div>
                            <div className="p-4 text-center">
                                <span className="text-xl font-medium block uppercase tracking-wide text-gray-900">
                                    15
                                </span>
                                <span className="text-sm text-gray-700">Operaciones</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className='mb-2'>
                            {/* <h2 color="gray">{userFb.displayName ? userFb.displayName : user.displayName}</h2> */}
                        </div>
                        <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                            {/* {userFb.email ? userFb.email : user?.email} */}
                        </div>
                        <div className="mt-0 mb-2 text-gray-700 flex items-center justify-center gap-2">
                            <Icon name="place" size="xl" />
                            Buenos Aires, Argentina
                        </div>
                        <div className="mb-2 text-gray-700 mt-10 flex items-center justify-center gap-2">
                            <Icon name="work" size="xl" />
                            Solution Manager - Creative Tim Officer
                        </div>
                        <div className="mb-2 text-gray-700 flex items-center justify-center gap-2">
                            <Icon name="account_balance" size="xl" />
                            University of Computer Science
                        </div>
                    </div>
                    <CardBody>
                        <div className="border-t border-lightBlue-200 px-2 ">
                            <h6 className="text-green-500 text-sm mt-3 mb-6 font-light uppercase">
                                User Information
                            </h6>
                            <div className="flex flex-wrap mt-10">
                                <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                    <Input
                                        type="text"
                                        color="green"
                                        placeholder={"Full Name "}
                                        outline={true}
                                        onChange={cuandoCambiaElInput}
                                        // value={user?.displayName}
                                    />
                                </div>
                                <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <Input
                                        type="email"
                                        color="green"
                                        placeholder={"Email Address "}
                                        outline={true}
                                        onChange={cuandoCambiaElInput}
                                        // value={user?.email}

                                    />
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <Button
                                    onClick={enviarAlServidor}
                                    color="green"
                                    buttonType="filled"
                                    size="lg"
                                    rounded={false}
                                    block={true}
                                    iconOnly={false}
                                    ripple="light"
                                >
                                    Enviar
                                </Button>
                            </div>
                        </div>
                    </CardBody>

                </form>
            </Card>
        </>
    );
}