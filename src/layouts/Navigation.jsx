import { AppBar, Button, IconButton, Toolbar, Typography, Container, Menu, Avatar, Tooltip, MenuItem, Box } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';


const pages = ['clientes', 'empleados', 'productos', 'ventas', 'rentas', 'servicios'];
const settings = ['Perfil', 'Cerrar Sesión'];

const Navigation = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = (e) => {
        setAnchorElNav(null);
    };
    const handleCloseUserMenu = (e) => {
        setAnchorElUser(null);
    };
    const menuUser = (e, f) => {
        switch (e.target.textContent) {
            case 'Cerrar Sesión':
                signOut({ callbackUrl: '/signin' });
            case 'Perfil':
                router.push('/perfil');
        }
        setAnchorElUser(null);
    }

    if (session) {
        return (
            < AppBar position="static" enableColorOnDark={true} sx={{ backgroundColor: '#fff', borderBottom: 'solid 0.1px', borderColor: 'lightgray', boxShadow: 3 }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Vista normal */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                            <Link className='nav-link' href={'/'}>
                                <img src='/favicon.png' style={{ width: '50px' }} />
                            </Link>
                        </Box>

                        {/* Vista movil */}

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="white"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} value={page}>
                                        <Link
                                            className='nav-link'
                                            href={`/${page}`}

                                            sx={{ my: 2, display: 'block' }}
                                            value={page}
                                        >
                                            {page.charAt(0).toUpperCase() + page.slice(1)}
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ flexGrow: 1, display: { md: 'none' }, mx: 'auto' }} >
                            <Link className='nav-link' href={'/'}>
                                <img src='/favicon.png' style={{ width: '50px' }} />
                            </Link>
                        </Box>

                        {/* Links vista normal */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button sx={{ color: '#000' }}>
                                    <Link
                                        className='nav-link'
                                        href={`/${page}`}
                                        key={page}
                                        sx={{ my: 2, color: '#fff', display: 'block' }}
                                        value={page}
                                    >

                                        {page}
                                    </Link>
                                </Button>

                            ))}
                        </Box>

                        {/* Avatar */}
                        <Box sx={{ flexGrow: 0, display: 'flex', color: '#fff' }}>
                            <Tooltip title={"Menu"}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={session.name} src={"/users/" + ((session.img != null || session.img != undefined) ? session.img : "")} sx={{ bgcolor: "#3bb2ed" }}>{session.name[0]}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key={session.user.name} onClick={menuUser}>
                                    <Typography textAlign="center">{session.user.name} (perfil)</Typography>
                                </MenuItem>
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={menuUser}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        )
    } else {
        return (
            < AppBar position="static" enableColorOnDark={true} sx={{ backgroundColor: '#fff', borderBottom: 'solid 0.1px', borderColor: 'lightgray', boxShadow: '10px' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Vista normal */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} >
                            <Link className='nav-link' href={'/'}>
                                <img src='/favicon.png' style={{ width: '50px' }} />
                            </Link>
                        </Box>
                        {/* Vista movil */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="white"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <MenuItem key={1} value="signin">
                                    <Link
                                        className='nav-link'
                                        href={`/signin`}

                                        sx={{ my: 2, display: 'block' }}
                                        value="signin"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { md: 'none' }, mx: 'auto' }} >
                            <Link className='nav-link' href={'/'}>
                                <img src='/favicon.png' style={{ width: '50px' }} />
                            </Link>
                        </Box>

                        {/* Links vista normal */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Button sx={{ color: '#000' }}>
                                <Link
                                    className='nav-link'
                                    href={`/signin`}
                                    key="signin"
                                    sx={{ my: 2, color: '#fff', display: 'block' }}
                                    value="signin"
                                >

                                    Iniciar Sesión
                                </Link>
                            </Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        )
    }
}

export default Navigation
