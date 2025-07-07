import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import { Router } from './Routes/Routes.tsx'

import { Provider } from 'react-redux'
import { persistor, store } from './redux/store/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <Toaster position="top-right" reverseOrder={false} />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
   <RouterProvider router={Router}/>
    </PersistGate>
    </Provider>
    
  </StrictMode>,
)
