import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from './pages/dashboard';
import Auth from './pages/auth';
import LandingPage from './pages/LandingPage';
import Header from './pages/Header'; 
import { ExpenseRecordsProvider } from './contexts/expenseContext';
import StockTracker from './pages/stocks/StockTracker';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const showHeader = location.pathname === '/dashboard' || location.pathname === '/stocks';

  return (
    <div className="app-container">
      {showHeader && <Header />}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<ExpenseRecordsProvider><Dashboard /></ExpenseRecordsProvider>} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/stocks' element={<StockTracker />} />
      </Routes>
    </div>
  );
}

export default App;
