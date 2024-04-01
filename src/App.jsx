import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Views from './pages/Views'
import 'react-toastify/dist/ReactToastify.css';


// import 'bootstrap/dist/css/bootstrap.min.css';
// import './bootstrap.min.css'

function App() {
  

  return (
    <>
    <Header/>
   
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/wishlist' element={<Wishlist/>}/>
      <Route path='/views/:id' element={<Views/>}/>
      <Route path='/*' element={<Home/>}/>
    </Routes>
    
    <Footer/>
    
    </>
  )
}

export default App
