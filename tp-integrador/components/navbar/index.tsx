'use client'
import Link from 'next/link';
import {useSession, signOut} from 'next-auth/react';
import {useState} from 'react';
import {Menu, X} from 'lucide-react';
import Image from 'next/image'
import {pageLinks} from "@/utils/pages";

const Navbar = () => {
  const {data: session} = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={pageLinks.feed} className="font-mono text-white text-2xl flex  items-center font-bold">
          <Image alt={'MeWeb Logo'} src={'/logo.png'} width={50} height={50}/> MeWeb
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href={pageLinks.feed} className={'text-white'}>
            Feed
          </Link>
          {session ? (
            <>
              <Link href={pageLinks.myPages} className="text-white">Mis páginas
              </Link>
              <button onClick={() => signOut()} className="text-white">Cerrar sesión</button>
            </>
          ) : (
            <Link className="text-white flex items-center" href={pageLinks.login}>

              <span>Iniciar sesión</span>
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link href={pageLinks.feed} className="block text-white">Feed
          </Link>
          {session ? (
            <>
              <Link href={pageLinks.myPages}
                    className="block text-white">Mis páginas
              </Link>
              <button onClick={() => signOut()} className="block text-white">Cerrar sesión</button>
            </>
          ) : (
            <Link href={pageLinks.login} className="block text-white flex items-center">
              <span>Iniciar sesión</span>
              <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;