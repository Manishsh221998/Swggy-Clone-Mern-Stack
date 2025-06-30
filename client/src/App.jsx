import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Routing from './routing/Routing'
  

function App() {
 
  return (
   <>
    <Routing/>
         <ToastContainer position="top-center" autoClose={1000} />
    </>
  )
}

export default App
