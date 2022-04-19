import "./styles.css";
import logo from "../../assets/Logo-2.png";
import { useNavigate } from "react-router-dom";

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

    return(
        <header className="container">
            <h1 className="nome-proj">Contador de Calorias</h1>

            <section>
                <div className="conteudo">
                    <div className="imagem">
                        <img className="img" src={logo} alt="Logo"/>                        
                    </div>

                    <span>Welcome, <strong>{userName !== null ? userName.toUpperCase():''}</strong>!</span>
                    <div className="topicos">
                        <p>Home</p>                  
                    </div>

                    <div className="topicos">
                        <p>Sobre</p>                  
                    </div>

                    <div className="topicos">
                        <p>Historico</p>                  
                    </div>


                    <button onClick={logout}>Logout</button>
                </div>
            </section>

        </header>
    );
}
