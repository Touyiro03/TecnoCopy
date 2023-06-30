import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Alert, Card, Snackbar } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="https://tecnocopy.com.mx/">
        @TecnoCopy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  // Si esta loggeado, redirigir al inicio
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const router = useRouter();

  const { data: session } = useSession();

  React.useEffect(() => {
    if (session != null) {
      router.push('/');
    }
  })
  const handleSubmit = (event) => {
    const data = new FormData(event.currentTarget);
    const credentials = {
      name: data.get('user'),
      password: data.get('password'),
    };
    event.preventDefault();
    signIn('credentials', { ...credentials, redirect: false })//callbackUrl: '/'})
      .then((res) => {
        if (!res.ok) {
          setOpen(true);
          return setMessage(res.error);
        } else {
          router.push('/');
        }
      });
  };


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          onClose={() => { setOpen(false) }}
          message={message}
          key={'bottomright'}
          autoHideDuration={3000}
        >
          <Alert severity='error'>{message}</Alert>
        </Snackbar>

        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Card sx={{ py: 5, borderRadius: 3, boxShadow: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                px: 3
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Inicio de sesión
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="user"
                  label="Usuario"
                  name="user"
                  autoComplete="user"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Iniciar Sesión
                </Button>
              </Box>
            </Box>
          </Card>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

