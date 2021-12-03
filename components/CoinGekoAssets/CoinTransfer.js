import React from 'react'
import Head from 'next/head'


export default function CoinTransfer() {
    return (
        <>
            <Head>
                <script src="https://widgets.coingecko.com/coingecko-coin-converter-widget.js"></script>
            </Head>
            <coingecko-coin-converter-widget coin-id="solana" currency="usd" background-color="#ffffff" font-color="#4c4c4c" locale="es"></coingecko-coin-converter-widget>
        </>
    )
}

