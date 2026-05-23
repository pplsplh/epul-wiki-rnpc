import type { Metadata } from 'next'
import { Cinzel, Crimson_Pro, IM_Fell_English } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Nav } from '@/components/Nav'
import { ScrollReset } from '@/components/ScrollReset'
import './globals.css'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const crimsonPro = Crimson_Pro({ 
  subsets: ['latin'],
  variable: '--font-crimson',
  display: 'swap',
})

const imFellEnglish = IM_Fell_English({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-fell',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Rellion: NPC Survival — Strategy Roadmap',
  description: 'F2P Strategy Guide from early to end game with Frieren-inspired aesthetic',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonPro.variable} ${imFellEnglish.variable} bg-parchment`}>
      <body className="font-sans antialiased text-ink">
        {/* Magic particles — fixed, muncul di semua halaman */}
        <div className="magic-particle" style={{ top: '15%', left: '10%' }} />
        <div className="magic-particle magic-particle-sage" style={{ top: '35%', right: '8%' }} />
        <div className="magic-particle" style={{ top: '55%', left: '15%' }} />
        <div className="magic-particle magic-particle-sage" style={{ top: '75%', right: '12%' }} />
        <div className="magic-particle" style={{ top: '85%', left: '5%' }} />
        <ScrollReset />
        <Nav />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
