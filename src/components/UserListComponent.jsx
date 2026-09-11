import UserCardComponent from './UserCardComponent';

export default function UserListComponent({  users = [], onSelecionarUsuario }) {
  if (users.length === 0) {
    return <p className="empty-state">Nenhum usuário encontrado.</p>;
  }

  return (
    <div className="user-list">
      {users.map((user) => (
        <UserCardComponent key={user.id} user={user} onSelecionarUsuario={onSelecionarUsuario} />
      ))}
    </div>
  );
}