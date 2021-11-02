import Head from 'next/head'
import StatusCard from '../components/StatusCard'
import PageVisitsCard from '../components/PageVisitsCard'
import TrafficCard from '../components/TrafficCard'
import ChartLine from '../components/Chart/'


export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | Crypto</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-800">
        <div className="pt-8">
          <div className="container mx-auto max-w-full">
            <ChartLine />
          </div>
        </div>

        <div className="px-3 md:px-8 mt-20">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
              <StatusCard
                color="pink"
                icon="trending_up"
                title="Traffic"
                amount="350,897"
                percentage="3.48"
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="Since last month"
              />
              <StatusCard
                color="orange"
                icon="groups"
                title="New Users"
                amount="2,356"
                percentage="3.48"
                percentageIcon="arrow_downward"
                percentageColor="red"
                date="Since last week"
              />
              <StatusCard
                color="purple"
                icon="paid"
                title="Sales"
                amount="924"
                percentage="1.10"
                percentageIcon="arrow_downward"
                percentageColor="orange"
                date="Since yesterday"
              />
              <StatusCard
                color="blue"
                icon="poll"
                title="Performance"
                amount="49,65%"
                percentage="12"
                percentageIcon="arrow_upward"
                percentageColor="green"
                date="Since last month"
              />
            </div>
          </div>
        </div>

        <div className="h-auto">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 xl:grid-cols-6">
              <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                <PageVisitsCard />
              </div>
              <div className="xl:col-start-4 xl:col-end-8 px-4 mb-14">
                <TrafficCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
