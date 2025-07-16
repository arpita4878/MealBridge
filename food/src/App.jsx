import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './component/Visitors/Home/Home';
import Nav from './component/Visitors/Nav/Nav';
import About from './component/Visitors/About/About';
import Service from './component/Visitors/service/Service';
import Contact from './component/Visitors/Contact/Conatct';

import Register from './component/User/Registration/Register';
import Login from './component/User/Login/Login';
import Verify from './component/User/Email/verify';
import Logout from './component/User/Logout/Logout';
import UserHome from './component/User/Home/Home';
import Donate from './component/User/Donate/Donate';
import Find from './component/User/Find/Find';
import AdminHome from './component/Admin/Home/Home';
import MUser from './component/Admin/ManageUSer/MUser';
import EProfile from './component/Admin/EProfle/EProfile';
import Donation from './component/Admin/ManageDonation/Donation';
import ViewClaim from './component/Admin/ViewClaim/ViewClaim';
import CPassword from './component/Admin/CPassword/CPassword';
import ImpactTracking from './component/User/ImpactTracking/ImpactTracking';




function App() {


  return (
    <>

      <Nav />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/service' element={<Service />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/verify/:vemail' element={<Verify />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/user' element={<UserHome />}></Route>
        <Route path='/donate' element={<Donate />}></Route>
        <Route path='/findfood' element={<Find />}></Route>
        <Route path='/admin' element={<AdminHome />}></Route>
        <Route path='/manage-users' element={<MUser/>}></Route>
        <Route path='/edit-profile-admin' element={<EProfile />}></Route>
        <Route path='/manage-donations' element={<Donation />}></Route>
        <Route path='/user-claims' element={<ViewClaim />}></Route>
        <Route path='/change-password-admin' element={<CPassword />}></Route>
        <Route path='/service/impactracking' element={<ImpactTracking/>}></Route>
      </Routes>



      {/*  Back to Top*/}
      <Link to="/">   <a class="btn btn-md-square btn-primary rounded-circle back-to-top"><i class="fa fa-arrow-up"></i></a> </Link>


    </>
  )
}

export default App;
