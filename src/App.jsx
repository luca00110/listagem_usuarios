import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import LoadingComponent from './components/LoadingComponent';
import UserListComponent from './components/UserListComponent';
import UserDetailsComponent from './components/UserDetailsComponent';
import NovoUsuarioComponent from './components/NovoUsuarioComponent';
import ModalComponent from './components/ModalComponent';
import SuccessMessageComponent from './components/SuccessMessageComponent';
import ErrorMessageComponent from './components/ErrorMessageComponent';
import UseFormComponent from './components/UseFormComponents';

const filtrarUsuariosPorTermo = (termo) => (usuario) => {
  const termoLower = termo.toLowerCase();

  return (
    usuario.name.toLowerCase().includes(termoLower) ||
    usuario.username.toLowerCase().includes(termoLower) ||
    usuario.email.toLowerCase().includes(termoLower)
  );
};

function App() {
  const url = "https://jsonplaceholder.typicode.com";
  const [usuarios, setUsuarios] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [mensagemModal, setMensagemModal] = useState(null);
  const [novoUsuario, setNovoUsuario] = useState(null);
  const [modalNovoUsuarioAberto, setModalNovoUsuarioAberto] = useState(false);
  

  

  const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca));

  async function buscarUsuarioPorId(id) {
    try {
      const resposta = await axios.get(
        `${url}/users/${id}`
      )
      const data = resposta.data
      setUsuarioSelecionado(data)
      
    } catch (error) {
      console.log("Erro ao buscar usuários por ID", error);
    }
  }

  async function buscarUsuarios() {
    try {
      const resposta = await axios.get(`${url}/users`);
      setUsuarios(resposta.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setErro(`Não foi possível buscar os usuários. Código: ${error.message}`);
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  }

  function limparUsuarioSelecionado() {
    setUsuarioSelecionado(null);
  }

  async function cadastrarUsuario(user) {
    try{
      const resposta = await axios.post(
        `${url}/users`, user
      )
      const data = resposta.data
      setNovoUsuario(data)
      setUsuarios([...usuarios, data])
      setModalNovoUsuarioAberto(false)
      setMensagemModal({
        tipo: 'sucesso',
        usuario: data,
      });
    } catch (error) {
      console.log("Erro ao cadastrar usuário", error)
      setMensagemModal({
        tipo: 'erro',
        mensagem: `Não foi possível cadastrar o usuário. Código: ${error.message}`,
      });
    }
  }

  async function excluirUsuario(id) {
    try {
      await axios.delete(`${url}/users/${id}`);
      setUsuarios((usuariosAtuais) => usuariosAtuais.filter((usuario) => usuario.id !== id));
      if (usuarioSelecionado?.id === id) setUsuarioSelecionado(null);
      if (novoUsuario?.id === id) setNovoUsuario(null);
    } catch (error) {
      setMensagemModal({
        tipo: 'erro',
        mensagem: `Não foi possível excluir o usuário. Código: ${error.message}`,
      });
    }
  }

  function fecharMensagemModal() {
    setMensagemModal(null);
  }
    
  

  useEffect(() => {
    buscarUsuarios();
  }, []);

  return (
    <div className="app-container">
      {/* USO DO HEADERCOMPONENT */}
      <HeaderComponent 
        title="Listagem de Usuários" 
        totalUsers={usuariosFiltrados.length} 
      />

      <button className='botao-novo-usuario'
        type="button"
        onClick={() => setModalNovoUsuarioAberto(true)} 
      >Cadastrar novo usuário</button>

      <input 
        type="text"
        placeholder="Filtrar Usuário..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="search-input"
      />

      {/* CORREÇÃO DO CARREGANDO + USO DO LOADINGCOMPONENT */}
      {carregando && (
        <LoadingComponent message="Buscando usuários da API..." />
      )}

      {/* MENSAGEM DE ERRO */}
      {erro && (
        <p className="error-message">{erro}</p>
      )}

      {usuarioSelecionado && (
        <UserDetailsComponent 
        usuario={usuarioSelecionado}
        onFecharDetalhes={ limparUsuarioSelecionado}
         />
      )}

      {mensagemModal && (
        <ModalComponent
          onFechar={fecharMensagemModal}
          className={mensagemModal.tipo === 'sucesso' ? 'success-notification' : undefined}
        >
          {mensagemModal.tipo === 'sucesso' ? (
            <SuccessMessageComponent usuario={mensagemModal.usuario} />
          ) : (
            <ErrorMessageComponent mensagem={mensagemModal.mensagem} />
          )}
        </ModalComponent>
      )}

      {/* USO DO USERLISTCOMPONENT COM OS DADOS FILTRADOS */}
      {!carregando && !erro && (
        <UserListComponent 
        users={usuariosFiltrados} 
        onSelecionarUsuario={buscarUsuarioPorId} 
        onExcluirUsuario={excluirUsuario}
        />
      )}

      {modalNovoUsuarioAberto && (
        <ModalComponent
        className="new-user-modal"
        titulo="Novo Usuário"
        onFechar={() => setModalNovoUsuarioAberto(false)}
        >
          <UseFormComponent onCadastrar={cadastrarUsuario} />
        </ModalComponent>
      )}

      {novoUsuario && (
        <NovoUsuarioComponent novoUsuario={novoUsuario}/>
      )}


    </div>
  );
}

export default App;