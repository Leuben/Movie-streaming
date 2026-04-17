import { Link } from 'react-router-dom';
import { useData } from '../context/DataContent';

export default function Profile() {
    const { currentUser, movies, isLoggedIn } = useData();
    if (!isLoggedIn) {
        return (
            <div style={styles.page}>
                <div style={styles.card}>
                    <h1>You're not logged in</h1>
                    <p>Please log in to view your profile and watchlist.</p>
                    <Link to="/login" style={styles.loginLink}>
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    const watchlist = movies.filter((movie) => currentUser.watchlist.includes(movie.id));

    return (
        <div style={styles.page}>
            <section style={styles.summaryCard}>
                <div>
                    <h1>{currentUser.name}</h1>
                    <p style={styles.subtext}>Member since 2024</p>
                </div>
                <div style={styles.statusCard}>
                    <span>Current Plan:  </span>
                    <strong>{currentUser.subscription}</strong>
                </div>
            </section>

            <section style={styles.card}>
                <h2>Your Watchlist</h2>
                {watchlist.length === 0 ? (
                    <p>Your watchlist is empty. Add a movie to start watching.</p>
                ) : (
                    <ul style={styles.watchlist}>
                        {watchlist.map((movie) => (
                            <li key={movie.id} style={styles.watchlistItem} className="hover-lift">
                                <img src={movie.poster} alt={movie.title} style={styles.watchlistPoster} />
                                <span style={styles.watchlistTitle}>{movie.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

const styles = {
    page: {
        padding: '24px'
    },
    summaryCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '24px',
        padding: '24px',
        borderRadius: '18px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)'
    },
    subtext: {
        color: 'var(--muted)',
        marginTop: '8px'
    },
    statusCard: {
        padding: '18px',
        borderRadius: '16px',
        backgroundColor: 'var(--surface-strong)',
        minWidth: '180px'
    },
    card: {
        backgroundColor: 'var(--surface)',
        padding: '24px',
        borderRadius: '18px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)'
    },
    watchlist: {
        listStyle: 'none',
        padding: 0,
        margin: '18px 0 0 0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '20px'
    },
    watchlistItem: {
        padding: '12px',
        border: '1px solid var(--glass-border)',
        borderRadius: '12px',
        backgroundColor: 'var(--surface-strong)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
    },
    watchlistPoster: {
        width: '100%',
        height: '240px',
        objectFit: 'cover',
        borderRadius: '8px'
    },
    watchlistTitle: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: '14px'
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
