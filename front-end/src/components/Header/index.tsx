import "./styles.css";
import logo from "../../assets/Logo-2.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaBlackberry } from "react-icons/fa";

export default function Header(){
    const userName = localStorage.getItem('userName');
    const navigate = useNavigate();


    async function logout(){
        try{
            localStorage.clear();
            navigate('/');
        }catch(err){
            alert('Logout failed');
        }
    }

    async function edit(){
        try{
            navigate('/edit')
        }catch(err){
            alert('Edit failed')
        }
    }

    return(
        <header className="container5">
            <h1 className="nome-proj">Contador de Calorias</h1>

            <section>
                <div className="conteudo">
                    <div className="imagem">
                        <img className="img" src={logo} alt="Logo"/>                        
                    </div>

                    <div className="topicos">
                        <Link to="/home" className="style-link">
                            <p>Home</p>   
                        </Link>               
                    </div>

                    <div className="topicos">
                        <Link to="/historic" className="style-link">
                            <p>Historico</p>     
                        </Link>             
                    </div>

                    <div className="topicos">
                        <Link to="/about" className="style-link">
                            <p>Sobre</p> 
                        </Link>                 
                    </div>



                </div>
                    <span className="welcome" style={{position: 'absolute', top: 90, right: 100}}>Welcome, <strong>{userName !== null ? userName.toUpperCase():''}</strong>!</span>

                    <button className="logbutton" style={{position: 'absolute', right: 10, top: 50}} onClick={edit}>Alterar Cadastro</button>

                    <button className="logbutton" style={{position: 'absolute', right: 10, top: 20}} onClick={logout}>Logout</button>
            </section>

        </header>
    );
}
