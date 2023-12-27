import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'
import { ToDoProvider } from './context/ToDoContext'

const nunito = Nunito_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'To Do',
  description: 'Desafio Front End',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={nunito.className}>
        <ToDoProvider>{children}</ToDoProvider>
      </body>
    </html>
  )
}
