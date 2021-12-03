import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format, parseISO, subDays } from "date-fns";
import { areaData } from './areaData'
import axios from 'axios';
import { useEffect, useState } from 'react';

const prices = [
  [
    1634973032612,
    2.16627503452528
  ],
  [
    1634976247762,
    2.175065376382644
  ],
  [
    1634979982418,
    2.176942418595574
  ],
  [
    1634983297880,
    2.167945089830033
  ],
  [
    1634986875281,
    2.1498931778765127
  ],
  [
    1634990756090,
    2.1709225195618007
  ],
  [
    1634994213734,
    2.162421499418706
  ],
  [
    1634997944070,
    2.1634216580452983
  ],
  [
    1635001400760,
    2.16221417449379
  ],
  [
    1635005033259,
    2.1701479705566435
  ],
  [
    1635008770990,
    2.1617632277227927
  ],
  [
    1635012130528,
    2.1568587777500774
  ],
  [
    1635015763480,
    2.1510310645807795
  ],
  [
    1635019443101,
    2.146298124828254
  ],
  [
    1635023258849,
    2.150877791910965
  ],
  [
    1635026717234,
    2.166604557465457
  ],
  [
    1635030517468,
    2.168903510381325
  ],
  [
    1635033820270,
    2.174154973200162
  ],
  [
    1635037332622,
    2.1647902093347464
  ],
  [
    1635041299947,
    2.1633877756658744
  ],
  [
    1635044406057,
    2.164121843989408
  ],
  [
    1635048017599,
    2.1659362525187973
  ],
  [
    1635051672129,
    2.149223139755174
  ],
  [
    1635055311611,
    2.149160488841494
  ],
  [
    1635059207516,
    2.1477459065184763
  ],
  [
    1635062683961,
    2.15163090683613
  ],
  [
    1635066096217,
    2.147699058856906
  ],
  [
    1635069697915,
    2.146561389320348
  ],
  [
    1635073350543,
    2.1536226903293287
  ],
  [
    1635076966557,
    2.1209756623169547
  ],
  [
    1635080486760,
    2.1255518296856075
  ],
  [
    1635084279463,
    2.1230505203302314
  ],
  [
    1635087696204,
    2.116129291234195
  ],
  [
    1635091317736,
    2.1125254851165614
  ],
  [
    1635095316833,
    2.1196077783736906
  ],
  [
    1635098726298,
    2.115436596249266
  ],
  [
    1635102067559,
    2.1047168100045814
  ],
  [
    1635105683255,
    2.1150290136630336
  ],
  [
    1635109573401,
    2.129054248301456
  ],
  [
    1635112991503,
    2.11895587210115
  ],
  [
    1635116466579,
    2.1286665188040623
  ],
  [
    1635120382794,
    2.128774672588315
  ],
  [
    1635123808911,
    2.1461466314237736
  ],
  [
    1635127964105,
    2.1400153310458307
  ],
  [
    1635131373266,
    2.143658808861393
  ],
  [
    1635134467357,
    2.137554562665
  ],
  [
    1635138389261,
    2.1377466904960962
  ],
  [
    1635141664567,
    2.1437869796620705
  ],
  [
    1635145295356,
    2.150579704545086
  ],
  [
    1635149102179,
    2.1612852583262465
  ],
  [
    1635152446082,
    2.1604830829621364
  ],
  [
    1635156486191,
    2.1567582060769492
  ],
  [
    1635159778670,
    2.152034929216841
  ],
  [
    1635163434104,
    2.153624738534663
  ],
  [
    1635167540410,
    2.1398023588158956
  ],
  [
    1635170480077,
    2.1486408097952086
  ],
  [
    1635174164048,
    2.1642872629415537
  ],
  [
    1635177675330,
    2.172559022199565
  ],
  [
    1635181240286,
    2.177441488309234
  ],
  [
    1635185049542,
    2.17538935620962
  ],
  [
    1635188475006,
    2.166830661513216
  ],
  [
    1635192293012,
    2.1575385942125527
  ],
  [
    1635195817644,
    2.152707370598382
  ],
  [
    1635199401654,
    2.15309070446027
  ],
  [
    1635202889292,
    2.156719284005945
  ],
  [
    1635206714722,
    2.1441250367123446
  ],
  [
    1635210334980,
    2.1636275536060894
  ],
  [
    1635214825242,
    2.163499810245866
  ],
  [
    1635217307838,
    2.1821318648946164
  ],
  [
    1635221167891,
    2.1902956310142794
  ],
  [
    1635224627767,
    2.185303933015526
  ],
  [
    1635228704319,
    2.1834814397224336
  ],
  [
    1635232054094,
    2.1809345914233127
  ],
  [
    1635236183188,
    2.1986280782288548
  ],
  [
    1635238966387,
    2.1931950283643613
  ],
  [
    1635243237383,
    2.18646925492443
  ],
  [
    1635246269192,
    2.1911291761217626
  ],
  [
    1635249882246,
    2.1814005249072275
  ],
  [
    1635253793725,
    2.1748032872434258
  ],
  [
    1635257058623,
    2.17190133199355
  ],
  [
    1635260654442,
    2.1632004611559497
  ],
  [
    1635264358404,
    2.1676319170130354
  ],
  [
    1635267824493,
    2.1540881516398738
  ],
  [
    1635271614217,
    2.182687937900519
  ],
  [
    1635274890987,
    2.1737409865738173
  ],
  [
    1635278586604,
    2.1735750031628456
  ],
  [
    1635282203151,
    2.1909298801704984
  ],
  [
    1635285675138,
    2.1506753184240313
  ],
  [
    1635289474014,
    2.135024412899304
  ],
  [
    1635293408246,
    2.147289702747709
  ],
  [
    1635296560799,
    2.1540442514360882
  ],
  [
    1635300471540,
    2.148053203516683
  ],
  [
    1635303660870,
    2.1481930573090895
  ],
  [
    1635307447999,
    2.146907026294318
  ],
  [
    1635311094314,
    2.155883378919501
  ],
  [
    1635314732679,
    2.1518777043614348
  ],
  [
    1635318073138,
    2.1442507531387096
  ],
  [
    1635321682320,
    2.1049431337975744
  ],
  [
    1635325216558,
    1.9978847251355423
  ],
  [
    1635328993387,
    1.9475145254288824
  ],
  [
    1635332923546,
    1.9838728399754244
  ],
  [
    1635336296269,
    1.9829805599542762
  ],
  [
    1635339928659,
    2.002359985524773
  ],
  [
    1635343500346,
    1.9839006927017873
  ],
  [
    1635347355135,
    1.9972169991237931
  ],
  [
    1635350522190,
    1.966900949888137
  ],
  [
    1635354942050,
    1.9832352344675759
  ],
  [
    1635357671442,
    1.968513557981241
  ],
  [
    1635361268380,
    1.9599096564320142
  ],
  [
    1635364860807,
    1.9395973492650749
  ],
  [
    1635368684604,
    1.9364543707809163
  ],
  [
    1635372238563,
    1.9599326782151076
  ],
  [
    1635375706765,
    1.9425584138845846
  ],
  [
    1635379403443,
    1.9187597684130688
  ],
  [
    1635383063971,
    1.9274725622851192
  ],
  [
    1635387185246,
    1.9376450796731044
  ],
  [
    1635390207647,
    1.9369999942822589
  ],
  [
    1635393851595,
    1.935494795374173
  ],
  [
    1635397286125,
    1.9134937240518337
  ],
  [
    1635400996957,
    1.9494325964315686
  ],
  [
    1635404548639,
    1.953092220504748
  ],
  [
    1635408238994,
    1.9578524527310197
  ],
  [
    1635412286773,
    2.0537207613714323
  ],
  [
    1635415470881,
    2.036730661646518
  ],
  [
    1635418816565,
    2.01546800235354
  ],
  [
    1635422425162,
    2.0084705849084066
  ],
  [
    1635426825501,
    2.0212647542769875
  ],
  [
    1635429884995,
    2.0375015229075113
  ],
  [
    1635434459105,
    2.0245398812317346
  ],
  [
    1635436936259,
    2.016271829248507
  ],
  [
    1635440580903,
    2.022292374011573
  ],
  [
    1635444068995,
    2.018063342162006
  ],
  [
    1635447675788,
    1.995153727541917
  ],
  [
    1635451229716,
    2.020599206001342
  ],
  [
    1635454831247,
    2.014726181712988
  ],
  [
    1635458921633,
    1.9916899779204016
  ],
  [
    1635462100182,
    1.9957444150527437
  ],
  [
    1635465758631,
    1.9946787201185678
  ],
  [
    1635470018027,
    2.0201929418959415
  ],
  [
    1635473036332,
    2.0302332229393962
  ],
  [
    1635476707278,
    2.019284655387282
  ],
  [
    1635480194875,
    2.0256921047557843
  ],
  [
    1635483780186,
    2.018110066931824
  ],
  [
    1635487552621,
    1.9945550466662127
  ],
  [
    1635491013328,
    2.0114321342350028
  ],
  [
    1635494418558,
    1.9952477067374228
  ],
]


export default function Chart() {

  const [chart, setChart] = useState(areaData)
const getData = async ()=> {
   await axios.get('https://api.coingecko.com/api/v3/coins/cardano/market_chart?vs_currency=usd&days=1').then(res => setChart(res.data.prices.map(price => ({ time: price[0], value: price[1] }))))
}

  useEffect(() => {
    getData()
  }, [])
  console.log(chart)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={chart}>
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />

        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          datakey="value"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(number) => `$${number.toFixed(2)}`}
        />


        <Tooltip content={<CustomTooltip data={chart} />} />

        <CartesianGrid opacity={0.1} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

function CustomTooltip({ active, payload }) {
  // console.log(payload)
  if (active) {
    return (
      <div className="tooltip">
        <h4>
          {format(payload[0]?.payload?.time ? payload[0]?.payload?.time : payload[0], " MMM, yyyy")}

        </h4>
        <p>${payload[0].value.toFixed(2)} usd</p>
      </div>
    );
  }
  return null;
}
