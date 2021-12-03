import React from 'react'
import Head from 'next/head'

export default function CoinCompareChart() {
    return (
        <>
            <Head>
                <script src="https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js"></script>
            </Head>
            <coingecko-coin-compare-chart-widget  coin-ids="bitcoin,ethereum,eos,ripple,litecoin" currency="usd" locale="es"></coingecko-coin-compare-chart-widget>
        </>
    )
}
