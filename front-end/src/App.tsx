import Header from "./components/Header";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedLayout } from './components/Protected';
import { Login } from './components/Login';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Register } from './pages/Register';
import Home from "./pages/Home";
import Historic from "./pages/Historic";
import { EditUser } from "./pages/EditUser";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
        <Route path='/home' element={
            <ProtectedLayout>
              <div>
                <Header/>
                <Home/>
              </div>
            </ProtectedLayout>
            }/>
          <Route path='/about' element={
            <ProtectedLayout>
              <div>
                <Header/>
                <About/>
              </div>
            </ProtectedLayout>
            }/>
            <Route path='/historic' element={
            <ProtectedLayout>
              <div>
                <Header/>
                <Historic/>
              </div>
            </ProtectedLayout>
            }/>
            <Route path='/edit' element={
            <ProtectedLayout>
                <EditUser/>
            </ProtectedLayout>
            }/>
            <Route
              path="/" element={<Navigate to="/login" replace />}
            />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="*" element={<NotFound/>} />
        </Routes>     
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
