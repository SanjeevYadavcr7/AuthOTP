import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import PageNotFoundComponent from './components/PageNotFoundComponent'; 
import PasswordComponent from './components/PasswordComponent'; 
import ProfileComponent from './components/ProfileComponent'; 
import RecoveryComponent from './components/RecoveryComponent'; 
import RegisterComponent from './components/RegisterComponent'; 
import ResetComponent from './components/ResetComponent'; 
import UserComponent from './components/UserComponent'; 


/* app routes */
const router = createBrowserRouter([
  { path: '/', element: <UserComponent/> },
  { path: '/register', element: <RegisterComponent/> },
  { path: '/password', element: <PasswordComponent/> },
  { path: '/profile', element: <ProfileComponent/> },
  { path: '/recovery', element: <RecoveryComponent/> },
  { path: '/reset', element: <ResetComponent/> },
  { path: '*', element: <PageNotFoundComponent/> }
]);


const MainComponent = () => {
  return(
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default MainComponent;