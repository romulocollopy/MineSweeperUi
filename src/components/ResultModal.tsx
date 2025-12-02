import { generateSlug } from 'random-word-slugs';
import { Link } from 'react-router-dom';

export function ResultModal({ result, onClose }: { result: 'win' | 'lose'; onClose: () => void }) {
  const message = result === 'win' ? '🎉 You Won!' : '💥 Game Over';

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div
        style={modalStyles.modal}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <button style={modalStyles.closeBtn} onClick={onClose}>
          ×
        </button>

        <h1 style={modalStyles.title}>{message}</h1>

        <div style={modalStyles.buttons}>
          <Link to={`/${generateSlug()}/`} style={modalStyles.btnPrimary}>
            ➕ New Game
          </Link>
        </div>
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    background: '#fff',
    padding: '30px 40px',
    borderRadius: '12px',
    textAlign: 'center' as const,
    width: '320px',
    position: 'relative' as const,
    boxShadow: '0 5px 20px rgba(0,0,0,0.25)',
  },
  closeBtn: {
    position: 'absolute' as const,
    top: '10px',
    right: '10px',
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  title: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  buttons: { display: 'flex', gap: '12px', justifyContent: 'center' },
  btn: {
    padding: '10px 18px',
    background: '#ccc',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
    color: '#000',
  },
  btnPrimary: {
    padding: '10px 18px',
    background: '#0066ee',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '16px',
  },
};
