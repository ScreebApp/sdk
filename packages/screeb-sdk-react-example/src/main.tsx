import React from 'react'
import ReactDOM from 'react-dom/client'

import { ScreebProvider } from '@screeb/sdk-react'

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ScreebProvider
      autoInit
      websiteId="0e2b609a-8dce-4695-a80f-966fbfa87a88"
      userId="dev@screeb.app"
      userProperties={{
        firstname: "John",
        lastname: "Smith",
        last_seen_at: new Date(),
        authenticated: true,
        org_size: 20,
      }}
    >
      <App />
    </ScreebProvider>
  </React.StrictMode>,
)
