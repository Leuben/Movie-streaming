import { useMemo, useState, useEffect } from 'react';
import { TextField, MenuItem, Pagination, Box } from '@mui/material';
import { useData } from '../context/DataContent';
import MovieCard from '../components/MovieCard';

export default function Movies() {
    const { movies } = useData();
    const [query, setQuery] = useState('');
    const [genre, setGenre] = useState('All');
    const [ratingFilter, setRatingFilter] = useState('All');
    const [sortOption, setSortOption] = useState('Default');
    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    const genres = useMemo(
        () => ['All', ...Array.from(new Set(movies.map((movie) => movie.genre)))],
        [movies]
    );

    const filteredAndSortedMovies = useMemo(() => {
        let result = movies.filter((movie) => {
            const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase());
            const matchesGenre = genre === 'All' || movie.genre === genre;
            const matchesRating = ratingFilter === 'All' || movie.rating >= Number(ratingFilter);
            return matchesQuery && matchesGenre && matchesRating;
        });

        if (sortOption === 'Highest Rated') {
            result.sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'Alphabetical') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }
        return result;
    }, [movies, query, genre, ratingFilter, sortOption]);

    useEffect(() => {
        setPage(1);
    }, [query, genre, ratingFilter, sortOption]);

    const pageCount = Math.ceil(filteredAndSortedMovies.length / ITEMS_PER_PAGE);
    const paginatedMovies = filteredAndSortedMovies.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <div>
                    <h1>Movie Library</h1>
                    <p>Browse all available titles, filter by genre and rating, and sort your results.</p>
                </div>
                <div style={styles.countBadge}>{filteredAndSortedMovies.length} results</div>
            </header>

            <div style={styles.filters}>
                <TextField
                    label="Search movies"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    variant="outlined"
                    fullWidth
                />
                <TextField
                    select
                    label="Genre"
                    value={genre}
                    onChange={(event) => setGenre(event.target.value)}
                    variant="outlined"
                    style={styles.select}
                >
                    {genres.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    select
                    label="Min Rating"
                    value={ratingFilter}
                    onChange={(event) => setRatingFilter(event.target.value)}
                    variant="outlined"
                    style={styles.select}
                >
                    <MenuItem value="All">All Ratings</MenuItem>
                    <MenuItem value="7">7.0+</MenuItem>
                    <MenuItem value="8">8.0+</MenuItem>
                    <MenuItem value="9">9.0+</MenuItem>
                </TextField>
                <TextField
                    select
                    label="Sort By"
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                    variant="outlined"
                    style={styles.select}
                >
                    <MenuItem value="Default">Default</MenuItem>
                    <MenuItem value="Highest Rated">Highest Rated</MenuItem>
                    <MenuItem value="Alphabetical">Alphabetical</MenuItem>
                </TextField>
            </div>

            <div style={styles.grid}>
                {paginatedMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {pageCount > 1 && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination 
                        count={pageCount} 
                        page={page} 
                        onChange={(e, value) => setPage(value)} 
                        color="primary" 
                    />
                </Box>
            )}
        </div>
    );
}

const styles = {
    page: {
        padding: '24px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        flexWrap: 'wrap',
        marginBottom: '24px'
    },
    countBadge: {
        padding: '10px 16px',
        borderRadius: '999px',
        backgroundColor: 'var(--surface)',
        border: '1px solid var(--border)',
        color: 'var(--muted)'
    },
    filters: {
        display: 'grid',
        gridTemplateColumns: '1fr 180px 180px 180px',
        gap: '16px',
        marginBottom: '24px'
    },
    select: {
        minWidth: '180px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
    }
};
