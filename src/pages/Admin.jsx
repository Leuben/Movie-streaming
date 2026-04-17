import { useState } from 'react';
import { Link } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import { useData } from '../context/DataContent';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

export default function Admin() {
    const { movies, isAdmin, isLoggedIn, deleteMovie } = useData();
    const [deleteId, setDeleteId] = useState(null);

    const handleDeleteClick = (id) => {
        setDeleteId(id);
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteMovie(deleteId);
            setDeleteId(null);
        }
    };

    if (!isLoggedIn) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h1>Admin access required</h1>
                    <p>You need to be logged in as a system admin to access this page.</p>
                    <Link to="/login" style={styles.loginLink}>
                        Login as Admin
                    </Link>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h1>Permission denied</h1>
                    <p>This page is reserved for system administrators only.</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <h1>Admin Panel</h1>
            <div style={styles.grid}>
                <div style={styles.formCard}>
                    <h2>Add New Movie</h2>
                    <MovieForm />
                </div>
                <div style={styles.listCard}>
                    <h2>Current Movies</h2>
                    <ul style={styles.movieList}>
                        {movies.map((movie) => (
                            <li key={movie.id} style={styles.movieItem}>
                                <span>{movie.title} ({movie.genre})</span>
                                <Button color="error" size="small" variant="outlined" onClick={() => handleDeleteClick(movie.id)}>
                                    Delete
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this movie? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteId(null)}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const styles = {
    page: {
        padding: '24px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
    },
    formCard: {
        backgroundColor: 'var(--surface)',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)'
    },
    listCard: {
        backgroundColor: 'var(--surface)',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border)'
    },
    movieList: {
        listStyle: 'none',
        padding: 0,
        margin: 0
    },
    movieItem: {
        padding: '10px 0',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card: {
        backgroundColor: 'var(--surface)',
        padding: '24px',
        borderRadius: '18px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)'
    },
    loginLink: {
        display: 'inline-block',
        marginTop: '18px',
        padding: '10px 18px',
        borderRadius: '999px',
        backgroundColor: 'var(--primary)',
        color: '#fff',
        textDecoration: 'none'
    }
};