import AppRoutes from './routes';
import Header from './components/header.jsx';
import { Container } from '@mui/material';

function App() {
  return (
    <Container
      sx={{
        marginTop: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header />
      <AppRoutes />
    </Container>
  );
}

export default App;
