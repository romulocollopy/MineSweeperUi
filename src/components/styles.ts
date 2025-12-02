export const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' },
  title: { margin: '0 0 10px', fontSize: '32px' },
  subtitle: { margin: '0 0 20px', color: '#555' },
  newGame: {
    display: 'inline-block',
    marginBottom: '20px',
    color: '#0066ee',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export const boardStyles = {
  wrapper: { display: 'inline-block', padding: '10px', borderRadius: '12px' },
  table: { borderCollapse: 'collapse' as const },
  cell: {
    border: '1px solid #aaa',
    padding: '4px',
    width: '28px',
    height: '28px',
    textAlign: 'center' as const,
    fontFamily: 'monospace',
    fontSize: '16px',
    borderRadius: '4px',
    userSelect: 'none' as const,
    transition: 'background 0.15s',
  },
};
