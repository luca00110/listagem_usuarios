export default function LoadingComponent({ message = "Carregando usuários..." }) {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}