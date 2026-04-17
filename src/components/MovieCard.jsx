import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Chip } from '@mui/material';
import { useData } from '../context/DataContent';

export default function MovieCard({ movie }) {
    const { currentUser, addToWatchlist, isLoggedIn } = useData();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const isInWatchlist = currentUser?.watchlist?.includes(movie.id);

    const handleWatchlist = () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
        addToWatchlist(movie.id);
    };

    return (
        <>
            <div style={styles.card} className="hover-lift">
                <img src={movie.poster} alt={movie.title} style={styles.poster} />
                <div style={styles.details}>
                    <div style={styles.headerRow}>
                        <h3 style={styles.title}>{movie.title}</h3>
                        <Chip label={movie.genre} size="small" style={styles.genreChip} />
                    </div>
                    <p style={styles.description}>{movie.description}</p>
                    <div style={styles.footer}>
                        <span style={styles.rating}>⭐ {movie.rating}</span>
                        <div style={styles.actions}>
                            <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
                                View details
                            </Button>
                            <Button
                                variant={isInWatchlist ? 'outlined' : 'contained'}
                                size="small"
                                onClick={handleWatchlist}
                            >
                                {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{movie.title}</DialogTitle>
                <DialogContent>
                    <img src={movie.poster} alt={movie.title} style={styles.dialogImage} />
                    <Typography variant="subtitle1" style={styles.dialogMeta}>
                        {movie.genre} • Rating: {movie.rating}
                    </Typography>
                    <Typography variant="body1" style={styles.dialogDescription}>
                        {movie.description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Close</Button>
                    <Button
                        variant={isInWatchlist ? 'outlined' : 'contained'}
                        onClick={() => {
                            if (!isLoggedIn) {
                                navigate('/login');
                                return;
                            }
                            addToWatchlist(movie.id);
                            setOpen(false);
                        }}
                    >
                        {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const styles = {
    card: {
        backgroundColor: 'var(--surface)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border)'
    },
    poster: {
        width: '100%',
        height: '320px',
        objectFit: 'cover'
    },
    details: {
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    headerRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '20px'
    },
    genreChip: {
        backgroundColor: 'var(--surface-strong)',
        color: 'var(--text)'
    },
    description: {
        margin: 0,
        color: 'var(--muted)',
        minHeight: '54px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        marginTop: 'auto'
    },  
    actions: {
        display: 'flex',
        gap: '12px',
    },
    rating: {
        fontWeight: '700',
        color: '#ffb400'
    },
    dialogImage: {
        width: '100%',
        borderRadius: '16px',
        marginBottom: '16px',
        objectFit: 'cover',
        maxHeight: '400px'
    },
    dialogMeta: {
        marginBottom: '12px',
        color: 'var(--muted)'
    },
    dialogDescription: {
        lineHeight: 1.7
    }
};