import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useData } from '../context/DataContent';
import { validateEmail, validatePassword } from '../utils/validation';

const sampleCredentials = [
    {
        label: 'User account',
        email: 'user@stream.com',
        password: 'user123'
    },
    {
        label: 'Admin account',
        email: 'admin@stream.com',
        password: 'admin123'
    }
];

export default function Login() {
    const { login } = useData();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(true);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        const result = login({ email, password });
        if (!result.success) {
            setError(result.error);
            return;
        }
        navigate('/dashboard');
    };

    const fillExample = (values) => {
        setEmail(values.email);
        setPassword(values.password);
        setError('');
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <div style={styles.welcome}>
                    <Typography variant="h3" component="h1" style={styles.title}>
                        Sign in to RwandaFlix
                    </Typography>
                    <Typography style={styles.subtitle}>
                        Securely log in and access your movies, watchlist, and admin dashboard.
                    </Typography>
                    <div style={styles.quickActions}>
                        {sampleCredentials.map((item) => (
                            <Button key={item.label} variant="outlined" onClick={() => fillExample(item)}>
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </div>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="email"
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type="password"
                        required
                        fullWidth
                        margin="normal"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={remember}
                                onChange={(event) => setRemember(event.target.checked)}
                            />
                        }
                        label="Remember this device"
                        style={styles.remember}
                    />
                    {error && <div style={styles.error}>{error}</div>}
                    <Button type="submit" variant="contained" size="large" fullWidth>
                        Login
                    </Button>
                    <Typography style={styles.helpText}>
                        Use your credentials to log in as a User or System Admin.
                    </Typography>
                </form>
            </div>
        </div>
    );
}

const styles = {
    page: {
        padding: '40px 24px',
        minHeight: 'calc(100vh - 96px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '100%',
        maxWidth: '780px',
        backgroundColor: 'var(--surface)',
        borderRadius: '24px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)',
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        overflow: 'hidden'
    },
    welcome: {
        padding: '40px',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    title: {
        marginBottom: '12px'
    },
    subtitle: {
        color: 'var(--muted)',
        lineHeight: 1.8
    },
    quickActions: {
        display: 'grid',
        gap: '12px',
        marginTop: '16px'
    },
    form: {
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    remember: {
        marginTop: '8px'
    },
    error: {
        color: '#973663',
        fontSize: '14px'
    },
    helpText: {
        color: 'var(--muted)',
        fontSize: '14px',
        marginTop: '8px'
    }
};
