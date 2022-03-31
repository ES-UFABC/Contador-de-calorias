import "./styles.css";
import logo from "../../assets/Logo-2.png";

export default function Header(){
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

                    <div className="topicos">
                        <p>Login</p>                  
                    </div>

                </div>
            </section>

        </header>
    );
}