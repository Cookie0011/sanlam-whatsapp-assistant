import './globals.css'
import type {ReactNode} from 'react'
export const metadata={title:'Sanlam WhatsApp Assistant',description:'Lead qualification and product information assistant'}
export default function RootLayout({children}:{children:ReactNode}){return <div className="shell">{children}</div>}
