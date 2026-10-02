export default function UserCardComponent({ user, onSelecionarUsuario, onExcluirUsuario }) {
  const { name, email, company, website } = user;

  return (
    <div className="user-card">
      <div className="avatar">
        {name.charAt(0).toUpperCase()}
      </div>
      <div className="user-info">
        <h3>{name}</h3>
        <p className="email">📧 {email}</p>
        {company && <p className="company">🏢 {company.name || company}</p>}
        {website && <p className="website">🌐 {website}</p>}


        <div className="user-card__actions">
          <button className="details-button" onClick={() => onSelecionarUsuario(user.id)}>
            Ver Detalhes
          </button>
          <button
            className="user-card__delete-button"
            type="button"
            onClick={() => {
              if (window.confirm(`Deseja excluir ${name}?`)) {
                onExcluirUsuario(user.id);
              }
            }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}