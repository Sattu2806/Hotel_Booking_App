import './globals.css'
import { Nunito } from "next/font/google";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

import Header from "./components/Header/Header"
import ClientOnly from './components/ClientOnly';
import Modal from './components/Modals/Modal';
import RegisterModal from './components/Modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/Modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import CategoryModal from './components/Modals/CategoryModal';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal/>
          <LoginModal/>
          <CategoryModal/>
          <Header currentUser = {currentUser}/>
          <ToasterProvider/>
        </ClientOnly>
        <div className="pb-10 pt-10">
        {children}
        </div>
        </body>
    </html>
  )
}