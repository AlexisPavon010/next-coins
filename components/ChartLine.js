import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import moment from 'moment';
import axios from 'axios';

const prices = [

    [
        1632978369899,
        2.1178199033355405
    ],
    [
        1632981887269,
        2.105307999600214
    ],
    [
        1632985202997,
        2.1074230954203164
    ],
    [
        1632988977964,
        2.0876851548638578
    ],
    [
        1632992503393,
        2.071252144781128
    ],
]





const time = prices.map(dia => moment(dia[0]).format('MMMM Do YYYY, h:mm:ss a'))

export default function ChartLine() {

    const [chart, setChart] = useState([])


    const now = chart?.map(dia => moment(dia[0]).format())
    console.log(time)
    // console.log(time)


    useEffect(() => {

        const resApi = async () => {
            const coinGeko = await axios.get('https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=5&interval=5')

            setChart(coinGeko?.data.prices)

        }
        resApi()




        var config = {
            type: "line",
            data: {
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
              ],
              datasets: [
                {
                  label: new Date().getFullYear(),
                  backgroundColor: "#4c51bf",
                  borderColor: "#4c51bf",
                  data: [65, 78, 66, 44, 56, 67, 75],
                  fill: false,
                },
                {
                  label: new Date().getFullYear() - 1,
                  fill: false,
                  backgroundColor: "#fff",
                  borderColor: "#fff",
                  data: [40, 68, 86, 74, 56, 60, 87],
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              title: {
                display: false,
                text: "Sales Charts",
                fontColor: "white",
              },
              legend: {
                labels: {
                  fontColor: "white",
                },
                align: "end",
                position: "bottom",
              },
              tooltips: {
                mode: "index",
                intersect: false,
              },
              hover: {
                mode: "nearest",
                intersect: true,
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                      display: false,
                      labelString: "Month",
                      fontColor: "white",
                    },
                    gridLines: {
                      display: false,
                      borderDash: [2],
                      borderDashOffset: [2],
                      color: "rgba(33, 37, 41, 0.3)",
                      zeroLineColor: "rgba(0, 0, 0, 0)",
                      zeroLineBorderDash: [2],
                      zeroLineBorderDashOffset: [2],
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontColor: "rgba(255,255,255,.7)",
                    },
                    display: true,
                    scaleLabel: {
                      display: false,
                      labelString: "Value",
                      fontColor: "white",
                    },
                    gridLines: {
                      borderDash: [3],
                      borderDashOffset: [3],
                      drawBorder: false,
                      color: "rgba(255, 255, 255, 0.15)",
                      zeroLineColor: "rgba(33, 37, 41, 0)",
                      zeroLineBorderDash: [2],
                      zeroLineBorderDashOffset: [2],
                    },
                  },
                ],
              },
            },
          };
        var ctx = document.getElementById('line-chart').getContext('2d');
        console.log(ctx)
        window.myLine = new Chart(ctx, config);
    }, []);

    return (
        <Card>
            <CardHeader color="orange" contentPosition="left">
                <h6 className="uppercase text-gray-200 text-xs font-medium">
                    Overview
                </h6>
                <h2 className="text-white text-2xl">Sales value</h2>
            </CardHeader>
            <CardBody>
                <div className="relative h-96">
                    <canvas  id="line-chart"></canvas>
                </div>
            </CardBody>
        </Card>
    );
}
