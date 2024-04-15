
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import LandlordDashboard from './components/LandlordDashboard';
import TenantDashboard from './components/TenantDashboard';
import Homepage from './components/Homepage';
import AboutUs from './components/AboutUs';
import ContactUs  from './components/ContactUs';
import Profile from './components/Profile';
import Category from './components/Category';
import CreateApartment  from './components/CreateApartment';
import Review from './components/Review';
import Billing from './components/Billing';
import Notification from './components/Notification';
import Account from './components/Account';
import Bookings from './components/Bookings';
import Transactions from './components/Transactions';
import ViewApartments from './components/ViewApartments';
import ViewBillings from './components/ViewBillings';
import Message from './components/Message';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/tenantDashboard" element={<TenantDashboard/>} />
      <Route path="/landlorddashboard" element={<LandlordDashboard/>} />
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/aboutus' element={<AboutUs/>}></Route>
      <Route path='/contactus' element={<ContactUs/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path='/category' element={<Category/>}></Route>
      <Route path='/createapartment' element={<CreateApartment/>}></Route>
      <Route path='/review' element={<Review/>}></Route>
      <Route path='/billing' element={<Billing/>}></Route>
      <Route path='/notification' element={<Notification/>}></Route>
      <Route path='/useraccount' element={<Account/>}></Route>
      <Route path='/transactions' element={<Transactions/>}></Route>
      <Route path='/bookings' element={<Bookings/>}></Route>
      <Route path='/viewpartments' element={<ViewApartments/>}></Route>
      <Route path='/viewbillings' element={<ViewBillings/>}></Route>
      <Route path='/message' element={<Message/>}></Route>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
