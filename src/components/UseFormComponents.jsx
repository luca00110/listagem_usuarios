import { useState} from "react";

function UseFormComponent({onCadastrar}) {
    const [nome, setNome] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

    //evento é o botao salvar
    //vai fazer evento para API
    //vai salvar as informacoes do usuario

    function handleSubmit(evento) { 
        evento.preventDefault();
        const novoUsuario = {
            name: nome,
            username: username,
            email: email,
            telefone: telefone
        }
        onCadastrar(novoUsuario);
        limparFormulario();

    }

    //passando aspas vazias ele limpa o formulario
    function limparFormulario() {
        setNome("");
        setUsername("");
        setEmail("");
        setTelefone("");
    }
    //html do formulario
    //quando clicar no botao salvar ele vai pegar o evento do formulario e executa a função
    return (
        <form className="formulario-usuario" onSubmit={handleSubmit} >
            <header className="formulario-usuario__cabecalho" >
                <p>Cadastro</p>
                <h2>Novo Usuário</h2>
            </header>

            <div className="campo-formulario" >
                <label htmlFor="novo-usuario-nome" >Nome:</label>
                <input type="text" id="novo-usuario-nome"
                    autoComplete="name"
                    value={nome}
                    onChange={(evento) => {
                        setNome(evento.target.value);
                    }}
                />
            </div>

            <div className="campo-formulario" >
                <label htmlFor="novo-usuario-username" >Nome de Usuário:</label>
                <input type="text" id="novo-usuario-username"
                    autoComplete="name"
                    value={username}
                    onChange={(evento) => {
                        setUsername(evento.target.value);
                    }}
                />
            </div>

            <div className="campo-formulario" >
                <label htmlFor="novo-usuario-email" >Email:</label>
                <input type="email" id="novo-usuario-email"
                    autoComplete="email"
                    value={email}
                    onChange={(evento) => {
                        setEmail(evento.target.value);
                    }}
                />
            </div>

            <div className="campo-formulario" >
                <label htmlFor="novo-usuario-telefone" >Telefone:</label>
                <input type="text" id="novo-usuario-telefone"
                    autoComplete="tel"
                    value={telefone}
                    onChange={(evento) => {
                        setTelefone(evento.target.value);
                    }}
                />
            </div>

            <button className="botao-cadastrar" type="submit">Cadastrar</button>
            
            

        </form>
    )
}

export default UseFormComponent;