import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from 'recharts';

import { Link } from 'react-router-dom';
import { useData } from '../context/DataContent';
import { useMemo } from 'react';

import './Dashboard.scss';

export default function Dashboard() {
    const {
        movies = [],
        movieStats = {},
        currentUser,
        isLoggedIn,
        isAdmin
    } = useData();

    if (!isLoggedIn || !isAdmin) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-card">
                    <h1>Admin access required</h1>
                    <p>This dashboard is only available to system administrators.</p>

                    {!isLoggedIn ? (
                        <Link to="/login" className="dashboard-login-link">
                            Go to Login
                        </Link>
                    ) : (
                        <Link to="/" className="dashboard-login-link">
                            Back to Home
                        </Link>
                    )}
                </div>
            </div>
        );
    }

    const userName = currentUser?.name ?? 'Guest';
    const watchlistSize = currentUser?.watchlist?.length ?? 0;

    const chartData = useMemo(() => {
        return movies.map(movie => ({
            name:
                movie.title.length > 12
                    ? movie.title.slice(0, 12) + '...'
                    : movie.title,
            rating: movie.rating
        }));
    }, [movies]);

    return (
        <div className="dashboard-page">

            {/* HEADER */}
            <header className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Monitor your library, watchlist and subscription status.</p>
                </div>

                <div className="dashboard-badge">
                    Member: {userName}
                </div>
            </header>

            {/* STATS */}
            <div className="dashboard-stats">
                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-label">Total Movies</span>
                    <strong>{movieStats?.total ?? 0}</strong>
                </div>

                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-label">Average Rating</span>
                    <strong>
                        {(movieStats?.averageRating ?? 0).toFixed(1)}
                    </strong>
                </div>

                <div className="dashboard-stat-card">
                    <span className="dashboard-stat-label">Watchlist Size</span>
                    <strong>{watchlistSize}</strong>
                </div>
            </div>

            {/* CHART */}
            <section className="dashboard-chart-section">
                <div className="dashboard-chart-heading">
                    <h2>Movie Ratings</h2>
                    <p>See how your movie collection performs across titles.</p>
                </div>

                <ResponsiveContainer width="100%" height={340}>
                    <BarChart data={chartData}>

                        {/* GRID for visibility in dark mode */}
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

                        {/* AXIS (dark-mode safe) */}
                        <XAxis dataKey="name" stroke="#cbd5e1" />
                        <YAxis stroke="#cbd5e1" domain={[0, 5]} />

                        {/* TOOLTIP (custom dark mode styling) */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '10px',
                                color: '#fff'
                            }}
                            itemStyle={{ color: '#fff' }}
                            labelStyle={{ color: '#cbd5e1' }}
                        />

                        {/* BAR (high contrast color) */}
                        <Bar
                            dataKey="rating"
                            fill="#84b9fa"
                            radius={[8, 8, 0, 0]}
                            isAnimationActive
                            animationDuration={1200}
                            animationEasing="ease-out"
                        />

                    </BarChart>
                </ResponsiveContainer>
            </section>
        </div>
    );
}