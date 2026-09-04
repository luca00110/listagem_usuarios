export default function HeaderComponent({ title = "Listagem de Usuários", totalUsers }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {totalUsers !== undefined && (
        <span className="badge">{totalUsers} {totalUsers === 1 ? 'usuário' : 'usuários'}</span>
      )}
    </header>
  );
}