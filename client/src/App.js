
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import LandlordDashboard from './components/LandlordDashboard';
import TenantDashboard from './components/TenantDashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/tenantDashboard" element={<TenantDashboard/>} />
      <Route path="/landlorddashboard" element={<LandlordDashboard/>} />
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
