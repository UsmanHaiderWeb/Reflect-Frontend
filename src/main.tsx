import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import HomePage from './pages/HomePage.tsx'
import NotFound from './pages/not-found.tsx'
import LoggedInContentWrapper from './components/LoggedInContentWrapper.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import JournalEntryPage from './pages/createJournal.tsx'
import DashBoard from './pages/DashBoard.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import ReduxStore from './ReduxStore/Store.ts'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import SingleCollectionWrapper from './components/SingleCollectionWrapper.tsx'
import SingleJournalWrapper from './components/SingleJournalWrapper.tsx'
import SingleJournalShowPage from './components/SingleJournalShowPage.tsx'
import SingleJournalEditPageWrapper from './components/SingleJournalEditPageWrapper.tsx'
import ProtectRoutes from './components/ProtectRoutes.tsx'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
})

const queryClient = new QueryClient()

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file');
}


const router = createBrowserRouter([
  {path: '/', element: <App />, children: [
    {path: '/', element: <LoggedInContentWrapper />, children: [
      {path: '/', element: <HomePage />},
      {path: '/journal/write', element: <ProtectRoutes><JournalEntryPage /></ProtectRoutes>},
      {path: '/journal/:entryId', element: <ProtectRoutes><SingleJournalWrapper /></ProtectRoutes>,
        children: [
          {path: '/journal/:entryId', element: <SingleJournalShowPage />},
          {path: '/journal/:entryId/edit', element: <SingleJournalEditPageWrapper />},
        ]
      },
      {path: '/dashboard', element: <ProtectRoutes><DashBoard /></ProtectRoutes>},
      {path: '/collection/:collectionId', element: <ProtectRoutes><SingleCollectionWrapper /></ProtectRoutes>},
      {path: '/*', element: <NotFound />},
    ]},
    {path: '/login/*', element: <Login />},
    {path: '/sign-up/*', element: <Signup />},
  ]},
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={ReduxStore}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
          <ApolloProvider client={apolloClient}>
            <RouterProvider router={router} />
          </ApolloProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
