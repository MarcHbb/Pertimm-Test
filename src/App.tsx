import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Login from './pages/login/Login';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
              <h1 className="text-3xl font-bold text-red-700">
                The resource you are looking for is not found :(
              </h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
