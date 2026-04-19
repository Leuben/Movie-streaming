import { useData } from '../context/DataContent';
import MovieCard from '../components/MovieCard';

export default function Home() {
    const { featuredMovies, currentUser, movies, isLoggedIn } = useData();
    const user = currentUser || { name: 'Guest', watchlist: [] };

    return (
        <div style={styles.page}>
            <section style={styles.hero}>
                <div style={styles.heroContent}>
                    <div>
                        <span style={styles.pill}>
                            {isLoggedIn ? `Welcome back, ${user.name}` : 'Welcome to RwandaFlix'}
                        </span>
                        <h1 style={styles.heroTitle}>Stream smarter with RwandaFlix.</h1>
                        <p style={styles.intro}>
                            Discover new releases, curate your watchlist, and stay connected with the latest titles.
                        </p>
                    </div>
                    <div style={styles.heroStats}>
                        <div style={styles.statCard}>
                            <span>Total movies </span>
                            <strong>{movies.length}</strong>
                        </div>
                        <div style={styles.statCard}>
                            <span>Watchlist items </span>
                            <strong>{user.watchlist.length}</strong>
                        </div>
                    </div>
                </div>
            </section>

            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2>Featured Movies</h2>
                    <p>Handpicked titles to keep you entertained this week.</p>
                </div>
                <div style={styles.grid}>
                    {featuredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </section>
        </div>
    );
}

const styles = {
    page: {
        padding: '24px'
    },
    hero: {
        background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.15) 0%, var(--surface-strong) 100%)',
        borderRadius: '24px',
        padding: '64px 48px',
        marginBottom: '48px',
        color: 'var(--text)',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden'
    },
    heroContent: {
        display: 'grid',
        gap: '32px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
    },
    heroTitle: {
        fontSize: '48px',
        fontWeight: '800',
        lineHeight: 1.1,
        marginBottom: '16px',
        letterSpacing: '-1px'
    },
    pill: {
        display: 'inline-flex',
        padding: '8px 14px',
        borderRadius: '100px',
        backgroundColor: 'var(--primary-soft)',
        color: 'var(--primary)',
        fontWeight: '700',
        marginBottom: '18px',
        // color: '#084e6e'
    },
    intro: {
        maxWidth: '640px',
        lineHeight: 1.7,
        color: 'var(--muted)'
        // color: '#cf7979'
    },
    heroStats: {
        display: 'grid',
        gap: '16px'
    },
    statCard: {
        backgroundColor: 'var(--surface)',
        padding: '24px',
        borderRadius: '18px',
        border: '1px solid var(--glass-border)',
        boxShadow: 'var(--shadow)',
        backdropFilter: 'blur(10px)'
    },
    section: {
        marginBottom: '48px'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        gap: '16px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        color: '#912a2aff'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px'
    }
};
