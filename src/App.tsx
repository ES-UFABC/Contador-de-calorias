import Rotas from './rotas';
import Header from "./components/Header";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedLayout } from './components/Protected';
import { Login } from './components/Login';
import Sobre from './pages/Sobre';
import { Register } from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={
            <ProtectedLayout>
              <Sobre/>
            </ProtectedLayout>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>     
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
