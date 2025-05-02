import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Games from './pages/Games';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/LayOut';
import LandingPage from './pages/LandingPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <>
          <Routes>
            {/* Root path shows LandingPage without Layout (for full-width design) */}
            <Route path="/" element={<Layout><LandingPage /></Layout>} />

            {/* All other routes use Layout wrapper */}
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/games" element={<Layout><Games /></Layout>} />
            <Route path="/wishlist" element={<Layout><Wishlist /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/register" element={<Layout><Register /></Layout>} />

            {/* Redirect any unknown paths to landing page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Global ToastContainer */}
          <ToastContainer 
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </>
      </Router>
    </AuthProvider>
  );
}

export default App;
