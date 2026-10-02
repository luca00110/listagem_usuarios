function SuccessMessageComponent({ usuario }) {
  return (
    <div role="status" aria-live="polite">
      <h2>Usuário cadastrado com sucesso</h2>
      <p>
        <strong>Nome:</strong> {usuario.name}
      </p>
      <p>
        <strong>Usuário:</strong> {usuario.username}
      </p>
      <p>
        <strong>E-mail:</strong> {usuario.email}
      </p>
    </div>
  );
}

export default SuccessMessageComponent;