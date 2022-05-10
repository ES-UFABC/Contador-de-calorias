import "./styles.css";
import logo from "../../assets/Logo-2.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
                        <Link to="/home">
                            <p>Home</p>   
                        </Link>               
                    </div>

                    <div className="topicos">
                        <Link to="/about">
                            <p>Sobre</p> 
                        </Link>                 
                    </div>

                    <div className="topicos">
                        <Link to="/historic">
                            <p>Historico</p>     
                        </Link>             
                    </div>

                </div>
                    <span style={{position: 'absolute', right: 100, top: 90}}>Welcome, <strong>{userName !== null ? userName.toUpperCase():''}</strong>!</span>

                    <button onClick={edit}>Alterar Cadastro</button>

                    <button className="logbutton" style={{position: 'absolute', right: 10, top: 75}} onClick={logout}>Logout</button>
            </section>

        </header>
    );
}
