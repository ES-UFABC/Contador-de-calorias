import{Routes, Route, BrowserRouter} from 'react-router-dom';

import Sobre from './pages/Sobre';

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/sobre'  element={<Sobre/>} />
            </Routes>
        </BrowserRouter>
    );
}