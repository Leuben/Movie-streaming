import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContent';
import { useTheme } from '../theme/Theme';
import { Drawer, IconButton, List, ListItem, ListItemText, Divider } from '@mui/material';
// import logo from '../posters/logo.png';

export default function Navbar() {
    const { currentUser, isLoggedIn, logout, isAdmin } = useData();
    const { colorScheme, toggleColorScheme } = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            style={{ width: 250, backgroundColor: 'var(--surface)', height: '100%', color: 'var(--text)' }}
        >
            <div style={{ padding: '20px', fontSize: '20px', fontWeight: 'bold', color: 'var(--primary)' }}>
                RwandaFlix Menu
            </div>
            <Divider sx={{ borderColor: 'var(--border)' }} />
            <List>
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/movies">
                    <ListItemText primary="Movies" />
                </ListItem>
                {isAdmin && (
                    <>
                        <ListItem button component={Link} to="/dashboard">
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                        <ListItem button component={Link} to="/admin">
                            <ListItemText primary="Admin" />
                        </ListItem>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <ListItem button component={Link} to="/profile">
                            <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button component={Link} to="/subscription">
                            <ListItemText primary="Subscription" />
                        </ListItem>
                    </>
                )}
            </List>
        </div>
    );

    return (
        <nav style={styles.navbar} className="glass">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IconButton onClick={toggleDrawer(true)} style={{ color: 'var(--text)' }}>
                    ☰
                </IconButton>
                <div style={styles.leubenLogo}>
                    <Link to="/" style={styles.rwbrand}>
                        <img src="/posters/logo.png" alt="RwandaFlix Logo"
                            style={styles.logo} /> 
                             <h5>RwandaFlix</h5>
                    </Link>
                </div>
            </div>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerContent}
            </Drawer>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>
                    Home
                </Link>
                <Link to="/movies" style={styles.link}>
                    Movies
                </Link>
                {isAdmin && (
                    <Link to="/dashboard" style={styles.link}>
                        Dashboard
                    </Link>
                )}
                {isAdmin && (
                    <Link to="/admin" style={styles.link}>
                        Admin
                    </Link>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/profile" style={styles.link}>
                            Profile
                        </Link>
                        <Link to="/subscription" style={styles.link}>
                            Subscription
                        </Link>
                    </>
                )}
            </div>
            <div style={styles.actions}>
                <span style={styles.user}>
                    {isLoggedIn ? `${currentUser.name} (${currentUser.role})` : 'Guest'}
                </span>
                {isLoggedIn ? (
                    <button style={styles.authButton} onClick={logout}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login" style={styles.loginButton}>
                        Login
                    </Link>
                )}
                <button style={styles.toggle} onClick={toggleColorScheme}>
                    {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        color: '#000000',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        borderBottom: '1px solid var(--glass-border)',
        // background: '#4d3935ffa'
    },
    rwbrand: {
        color: 'rgba(250, 255, 255, 0)',
        fontSize: '30px',
        fontWeight: '700',
        textDecoration: 'none',
        display: 'flex',
        transition: '0.2s',

    },
    links: {
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap'
    },
    link: {
        color: 'var(--text)',
        textDecoration: 'none',
        fontWeight: '500',
        transition: '0.2s',
        padding: '6px 12px',
        borderRadius: '8px'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    user: {
        fontSize: '14px',
        color: 'var(--muted)'
    },
    loginButton: {
        color: 'var(--text)',
        border: '1px solid var(--border)',
        padding: '8px 14px',
        borderRadius: '999px',
        textDecoration: 'none'
    },
    authButton: {
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--text)',
        padding: '8px 14px',
        borderRadius: '999px',
        cursor: 'pointer'
    },
    toggle: {
        border: '1px solid var(--border)',
        background: 'transparent',
        color: 'var(--text)',
        padding: '8px 14px',
        borderRadius: '999px',
        cursor: 'pointer'
    },
    leubenLogo: {
        color: 'var(--primary)',
        fontSize: '22px',
        fontWeight: '700',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'left',
        gap: '10px'
    },
    logo: {
        width: '60px',
        height: '60px',
        borderRadius: '8px'
    }
};
