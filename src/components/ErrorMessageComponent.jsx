function ErrorMessageComponent({ mensagem }) {
  return (
    <div>
      <h2>Erro ao cadastrar usuário</h2>
      <p>{mensagem}</p>
    </div>
  );
}

export default ErrorMessageComponent;