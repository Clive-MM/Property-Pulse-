
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import LandlordDashboard from './components/LandlordDashboard';
import TenantDashboard from './components/TenantDashboard';
import Homepage from './components/Homepage';
import AboutUs from './components/AboutUs';
import ContactUs  from './components/ContactUs';


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
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
