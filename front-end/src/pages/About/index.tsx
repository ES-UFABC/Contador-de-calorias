import "./styles-sobre.css";

export default function About(){
    

    return(
        <div className="style-sobre">

            <h1 className="titulo">Sobre</h1>
            
            <h3 className="descricao">
                O objetivo do aplicativo Contador de Calorias é auxiliar na contagem diária de calorias e macronutrientes dos alimentos ingeridos pelos usuários ao longo do dia.
                Este aplicativo fornece o número de calorias com base no resultado de uma pesquisa do usuário por um tipo de alimento.
                Ao selecionar mais de um alimento pode-se calcular a quantidade total de calorias ingeridas em um dia.
                Ainda, os dados poderão ser guardados para a elaboração do Historico de Consumo que permitirá acompanhar a quantidade ingerida de calorias em um determinado período.
            </h3>

            <h1 className="devs">Desenvolvedores</h1>

            <h3 className="devs-nome">
                <h4>Anderson Lima de Araújo</h4>
                <h4>André Marinho Monson Nascimento</h4>
                <h4>Lucas Martin De Lucca</h4>
                <h4>Mateus da Silva Belchior Capistrano</h4>
            </h3>

        </div>
    );
}