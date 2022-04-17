import Rotas from './rotas';
import Header from "./components/Header";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { ProtectedLayout } from './components/Protected';
import { Login } from './components/Login';
import Sobre from './pages/Sobre';
import NotFound from './pages/NotFound';
import { Register } from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={
            
            <ProtectedLayout>
              <div>
                <Header/>
                <Sobre/>
              </div>
            </ProtectedLayout>
            }/>
            <Route
              path="/"
              element={<Navigate to="/login" replace />}
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
