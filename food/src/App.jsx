import { lazy, Suspense } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './component/Visitors/Nav/Nav';

const Home = lazy(() => import('./component/Visitors/Home/Home'));
const About = lazy(() => import('./component/Visitors/About/About'));
const Service = lazy(() => import('./component/Visitors/service/Service'));
const Contact = lazy(() => import('./component/Visitors/Contact/Conatct'));

const ChatBot = lazy(() => import('./component/User/Bot/Bot'));
const BecomePartner = lazy(() => import('./component/User/Partner/Partner'));
const GamificationDashboard = lazy(() => import('./component/User/Badges/GamificationDashboard'));
const Volunteer = lazy(() => import('./component/User/Volunteer/Volunteer'));
const GetInvolved = lazy(() => import('./component/User/getInvolve/GetInvolve'));
const Register = lazy(() => import('./component/User/Registration/Register'));
const Login = lazy(() => import('./component/User/Login/Login'));
const Verify = lazy(() => import('./component/User/Email/verify'));
const Logout = lazy(() => import('./component/User/Logout/Logout'));
const UserHome = lazy(() => import('./component/User/Home/Home'));
const Donate = lazy(() => import('./component/User/Donate/Donate'));
const Find = lazy(() => import('./component/User/Find/Find'));
const EditProfile = lazy(() => import('./component/User/Eprofile/EPUser'));
const ChangePassword = lazy(() => import('./component/User/Cpassword/ChangePassword'));
const ImpactTracking = lazy(() => import('./component/User/ImpactTracking/ImpactTracking'));

const AdminHome = lazy(() => import('./component/Admin/Home/Home'));
const MUser = lazy(() => import('./component/Admin/ManageUSer/MUser'));
const Donation = lazy(() => import('./component/Admin/ManageDonation/Donation'));
const ViewClaim = lazy(() => import('./component/Admin/ViewClaim/ViewClaim'));
const CPassword = lazy(() => import('./component/Admin/CPassword/CPassword'));


const userImpactData = [
  { icon: '🍎', label: 'Kilograms of Food Saved', value: 45 },
  { icon: '🤝', label: 'People Helped', value: 120 },
  { icon: '🌱', label: 'Kg CO₂ Avoided', value: 70 },
];



function App() {


  return (
    <>

      <Nav />
<Suspense fallback={<div className="text-center p-5">Loading...</div>}>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/service' element={<Service />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/verify/:vemail' element={<Verify />} />
    <Route path='/logout' element={<Logout />} />
    <Route path='/user' element={<UserHome />} />
    <Route path='/donate' element={<Donate />} />
    <Route path='/findfood' element={<Find />} />
    <Route path='/editprofile' element={<EditProfile />} />
    <Route path='/changepassword' element={<ChangePassword />} />
    <Route path='/service/impactracking' element={<ImpactTracking />} />
    <Route path='/impactracking' element={<ImpactTracking   metrics={userImpactData}/>} />
    <Route path='/get-involved' element={<GetInvolved />} />
    <Route path='/volunteer' element={<Volunteer />} />
    <Route path="/dashboard" element={<GamificationDashboard />} />
    <Route path="/partners" element={<BecomePartner />} />

    <Route path='/admin' element={<AdminHome />} />
    <Route path='/manage-users' element={<MUser />} />
    <Route path='/manage-donations' element={<Donation />} />
    <Route path='/user-claims' element={<ViewClaim />} />

  </Routes>
</Suspense>

      {/*  Back to Top*/}
<ChatBot />



    </>
  )
}

export default App;
