import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/router'
import "@styles/default.scss"
import MobileLimiter from '@/components/mobile-limiter/mobile-limiter'
import Layout from './layout/layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <MobileLimiter>
                <Layout>
                    <Router />
                </Layout>
            </MobileLimiter>
        </BrowserRouter>
    </Provider>
  </StrictMode>,
)
