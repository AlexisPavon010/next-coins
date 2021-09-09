import Head from 'next/head'
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Progress from '@material-tailwind/react/Progress';
import { app, db } from '../firebase/client';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

export default function Movimientos({ tradeFb, userUid }) {

    console.log(tradeFb)
    console.log(userUid)


    const [realtimeDb, loading, error] = useCollection(
        db.collection(userUid).doc('movimientos').collection('order')
    )
    // console.log(realtimeDb)

    // useEffect(() => {
    //     app.auth().onAuthStateChanged(user => setUser(user))
    //     db.collection(userFb?.uid).doc('movimientos').collection('order').get().then(
    //         doc=>doc.docs.map(data=> setTrade(data.data())))
    // }, [])



    return (
        <>
            <Head>
                <title>Movimientos | Crypto Coins</title>
            </Head>
            <Card>
                <CardHeader color="green" contentPosition="left">
                    <h2 className="text-white text-2xl">Ultimos Movimientos</h2>
                </CardHeader>
                <CardBody>
                    <div className="overflow-x-auto">
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-2 text-green-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Operation
                                    </th>
                                    <th className="px-2 text-green-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Cryptocurrency
                                    </th>
                                    <th className="px-2 text-green-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Value
                                    </th>
                                    <th className="px-2 text-green-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Quantity
                                    </th>
                                    <th className="px-2 text-green-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                                        Exchange
                                    </th>
                                </tr>
                            </thead>
                            <tbody>


                                {
                                tradeFb ? tradeFb?.map((trade, i) => (
                                    <tr key={i}>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            <i className={`fas fa-circle fa-sm ${trade?.operation === 'Shell' ? 'text-green-500' : 'text-blue-500'} mr-2`} ></i>{' '}
                                            {trade?.operation}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {trade?.operation}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {`${trade?.cryptoSell} ${trade.price}`}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            {`${trade?.cryptoSell} ${trade.quantity}`}
                                        </th>
                                        <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                            Binance
                                        </th>
                                    </tr>
                                    )) :

                                    realtimeDb?.docs.map((trade, i) => (
                                        // console.log(trade?.data()),
                                        <tr key={i}>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                <i className={`fas fa-circle fa-sm ${trade?.operation === 'Shell' ? 'text-green-500' : 'text-blue-500'} mr-2`} ></i>{' '}
                                                {trade?.data().operation}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {trade?.data().cryptoSell}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {`${trade?.data().cryptoSell} ${trade?.data().price}`}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                {`${trade?.data().cryptoSell} ${trade?.data().quantity}`}
                                            </th>
                                            <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                                Binance
                                            </th>
                                        </tr>
                                    ))}
                                {/* <tr>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        <i className="fas fa-circle fa-sm text-green-500 mr-2"></i>{' '}
                                        Buy
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        USDT 50000.00
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC 1.00000000
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        Binance
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        <i className="fas fa-circle fa-sm text-blue-500 mr-2"></i>{' '}
                                        Sell
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        USDT 50000.00
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC 1.00000000
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        Binance
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        <i className="fas fa-circle fa-sm text-green-500 mr-2"></i>{' '}
                                        Buy
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        USDT 50000.00
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC 1.00000000
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        Binance
                                    </th>
                                </tr>
                                <tr>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        <i className="fas fa-circle fa-sm text-blue-500 mr-2"></i>{' '}
                                        Sell
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        USDT 50000.00
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        BTC 1.00000000
                                    </th>
                                    <th className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                                        Binance
                                    </th>
                                </tr> */}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}