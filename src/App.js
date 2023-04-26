import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from 'react-router-dom'
import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import About from './Pages/About';
import Contact from './Pages/Contact';
import AllUsers from './Pages/AllUsers';
import './App.css';
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';



function App() {

const {isLogedIn} = useSelector((state)=> state.value)

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={isLogedIn ? <Dashboard/> : <Navigate to='/login'/>} />
    <Route path='/login' element={<Login/>}/> 
    <Route path='/signup' element={<Signup/>}/> 
    <Route path='/about' element={isLogedIn ? <About/>:  <Navigate to='/login'/>}/> 
    <Route path='/contact' element={isLogedIn ? <Contact/> : <Navigate to='/login'/>}/> 
    <Route path='/allUsers' element={isLogedIn ? <AllUsers/> : <Navigate to='/login'/>}/> 
    </>
  )
)

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer theme='light' position="bottom-right" hideProgressBar={true} autoClose={3000}></ToastContainer>
    </>
  );
}

export default App;
