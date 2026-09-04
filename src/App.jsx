import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import LoadingComponent from './components/LoadingComponent';
import UserListComponent from './components/UserListComponent';

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

  const usuariosFiltrados = usuarios.filter(filtrarUsuariosPorTermo(busca));

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

      {/* USO DO USERLISTCOMPONENT COM OS DADOS FILTRADOS */}
      {!carregando && !erro && (
        <UserListComponent users={usuariosFiltrados} />
      )}
    </div>
  );
}

export default App;