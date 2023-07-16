// Estilos para el contenedor dentro del modal (Paper, Box, etc.)
const contenidoModal = {
    fontSize: '0.875rem',
    fontWeight: 600,
    boxSizing: 'border-box',
    minHeight: 'calc(1.5em + 22px)',
    borderRadius: '12px',
    padding: '6px 12px',
    lineHeight: 1.5,
    background: 'white',
    border: '1px solid',
    color: 'grey',
    '&:focus-visible': {
        borderColor: 'black',
        outline: '3px solid'
    }
};

export { contenidoModal }