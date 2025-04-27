import React from 'react'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ChatbotPage from './pages/ChatbotPage';
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/userdashboard' element={<UserDashboard/>}/>
          <Route path='/admindashboard' element={<AdminDashboard/>}/>
          <Route path='/chatbot' element={<ChatbotPage/>}/>

        </Routes>
      </Router>
    </div>
  )
}

export default App