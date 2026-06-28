import Homepage from "./pages/homepage/Homepage.jsx"
import { Routes,Route } from 'react-router-dom'
import Loginpage from "./pages/loginpage/Loginpage.jsx"
import Signuppage from "./pages/signuppage/Signuppage.jsx"
import Commonpage from "./pages/commongpage/Commonpage.jsx"
import Profile from "./pages/userprofilepage/Profile.jsx"
import Editprofile from "./pages/editprofilepage/Editprofile.jsx"
import Cart from "./pages/cartpage/Cart.jsx"
import Itempage from "./pages/itemPage/Itempage.jsx"

export default function App(){
  return(<>
    <div>
      <Routes>
        <Route path="/" element = {<Homepage/>}/>
        <Route path="/home" element={<Commonpage/>}/>
        <Route path="/home/login" element={<Loginpage/>}/>
        <Route path ="/home/signup" element={<Signuppage/>}/>
        <Route path="/user/userprofile" element={<Profile/>}  />
        <Route path="/user/userprofile/editprofile" element={<Editprofile/>} />
        <Route path="/user/userprofile/cart" element={ <Cart/> } />
        <Route path="/home/:id" element={ <Itempage/> }/>
      </Routes>
    </div>
  </>)
}