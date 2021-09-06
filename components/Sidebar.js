import { useState } from 'react';
import Link from 'next/link';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-gray-800 w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <div className="mt-2 text-center w-full inline-block">
                        <H6 color="white">Crypto Coins</H6>
                    </div>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />

                        <ul className="flex-col min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                <Link href='/' >
                                    <a className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg">
                                        <Icon name="dashboard" size="2xl" />
                                        Dashboard
                                    </a>
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link href='/trade' >
                                    <a className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg">
                                        <Icon name="price_change" size="2xl" />
                                        Trade
                                    </a>
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link href='/operaciones' >
                                    <a className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg">
                                        <Icon name="trending_up" size="2xl" />
                                        Operaciones
                                    </a>
                                </Link>
                            </li>
                            <li className="rounded-lg mb-2">
                                <Link href='/' >
                                    <a className="flex items-center gap-4 text-sm text-white font-light px-4 py-3 rounded-lg">
                                        <Icon name="settings" size="2xl" />
                                        Configuracion
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
