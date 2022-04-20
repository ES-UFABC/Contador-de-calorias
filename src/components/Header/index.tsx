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

                    <div className="topicos">
                        <p>Home</p>                  
                    </div>

                    <div className="topicos">
                        <p>Sobre</p>                  
                    </div>

                    <div className="topicos">
                        <p>Historico</p>                  
                    </div>


                </div>
                    <span style={{position: 'absolute', right: 100, top: 75}}>Welcome, <strong>{userName !== null ? userName.toUpperCase():''}</strong>!</span>

                    <button className="logbutton" style={{position: 'absolute', right: 10, top: 75}} onClick={logout}>Logout</button>


            </section>

        </header>
    );
}
