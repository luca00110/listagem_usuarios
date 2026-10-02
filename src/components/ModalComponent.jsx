function ModalComponent({ children, onFechar, className }) {
  return (
    <dialog className={className} open aria-modal="true">
      <button type="button" onClick={onFechar} aria-label="Fechar modal">
        Fechar
      </button>
      {children}
    </dialog>
  );
}

export default ModalComponent;