import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/router'
import "@styles/default.scss"
import MobileLimiter from '@/components/mobile-limiter/mobile-limiter'
import Layout from './layout/layout'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
        <MobileLimiter>
            <Layout>
                <Router />
            </Layout>
        </MobileLimiter>
    </BrowserRouter>
  </StrictMode>,
)
