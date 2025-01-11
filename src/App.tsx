import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';
import { registerUser } from './lib/axios-calls';
import { useUser } from '@clerk/clerk-react';
import { request } from 'graphql-request'
import { useDispatch } from 'react-redux';
import { AppDispatch } from './ReduxStore/Store';
import { userDataActions } from './ReduxStore/Slices/userData.slice';
import { userDataQuery } from './lib/graphqlQueries';
import AppLoader from './components/AppLoader';

const App = () => {
  const [ isAuthenticated, setAuthenticationState ] = useState(false);
  const { isLoaded, user } = useUser();
  const token = localStorage.getItem('reflectToken');
  const dispatch = useDispatch<AppDispatch>();

  const { mutate, isLoading }: any = useMutation({
    mutationKey: ['register or authenticate'],
    mutationFn: registerUser,
    // onError: () => setAuthenticationState(true),
    onSuccess: (data: {message: string, token?: string}) => {
      setAuthenticationState(true);
      data.token && localStorage.setItem('reflectToken', data.token)
    },
  });

  useEffect(() => {
    if (!isLoading && isLoaded) {
      mutate({clerkId: user?.id, email: user?.emailAddresses[0].emailAddress, token: token})
    }
  }, [ isLoaded ])

  const userDataFetchingQuery = useQuery({
    queryKey: ['userData'],
    queryFn: (): any => request('http://localhost:3000/graphql', userDataQuery, {token}),
    staleTime: Infinity,
    enabled: !!isAuthenticated && !!token,
    onError: (error: any) => console.log("Fetch User Data Error: ", error.message)
  })

  useEffect(() => {
    if(userDataFetchingQuery.data && userDataFetchingQuery.data?.getUserData) {
      console.log("userDataFetchingQuery.data?.getUserData: ", userDataFetchingQuery.data?.getUserData)
      dispatch(userDataActions.update(userDataFetchingQuery.data?.getUserData))
    }
  }, [userDataFetchingQuery.data])

  return (<>
    {!isLoaded && <AppLoader />}
    <div className={isLoaded ? "block" : 'hidden'}>
      <ToastContainer closeOnClick={true} pauseOnHover={true} draggable={true} />
      <Outlet />
    </div>
  </>)
}

export default App