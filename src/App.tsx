import Rotas from './rotas';
import Header from "./components/Header";
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ProtectedLayout } from './components/Protected';
import { Login } from './components/Login';
import Sobre from './pages/Sobre';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={
            <ProtectedLayout>
              <Header/>
            </ProtectedLayout>}/>
          <Route path='/login' element={<Login/>}>
          </Route>
        </Routes>     
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
