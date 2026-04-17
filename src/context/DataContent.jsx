import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const DataContext = createContext();

const initialMovies = [
    {
        id: 1,
        title: 'The Red Horizon',
        genre: 'Drama',
        rating: 8.2,
        poster: '/posters/the red horizon.webp',
        // video:'/movies/Bulk.mp4',
        description: 'A high-octane adventure across dangerous terrain.'
    },
    {
        id: 2,
        title: 'G.I. Joe: The Rise of Cobra',
        genre: 'Action',
        rating: 7.5,
        poster: '/posters/j.i.jpg',
        // video:'/movies/Bulk.mp4',
        description: 'An elite team of soldiers battles a powerful organization.'
    },
    {
        id: 3,
        title: '300 Spartans',
        genre: 'Action',
        rating: 8.9,
        poster: '/posters/300.jpg',
        description: 'A thrilling retelling of the Battle of Thermopylae.'},
    {
        id: 4,
        title: 'The incredible Hulk',
        genre: 'Sci-Fi',
        rating: 8.2,
        poster: '/posters/the incredible hulk.jpg',
        // poster: 'The.Incredible.Hulk.(NKIRI.COM).2008.BluRay.DOWNLOADED.FROM.NKIRI.COM.mkv',
        description: 'Watch an incredible hulk for free!!.'
    },
    {
        id: 5,
        title: 'Fast and Furious 9',
        genre: 'Action',
        rating: 8.9,
        poster: '/posters/f9.webp',
        video:'/movies/Bulk.mp4',
        description: 'The ninth installment in the Fast & Furious franchise, featuring high-speed action and thrilling stunts.'
    },
    {
        id: 6,
        title: 'Mother android',
        genre: 'Sci-Fi',
        rating: 8.2,
        poster: '/posters/mother android.png',
        video:'/movies/Bulk.mp4',
        description: 'A touching story about a mother and her android child.'
    },
    
    {
        id: 7,
        title: 'Justice League Crisis On Infinite Earths_Part two',
        genre: 'Sci-Fi',
        rating: 9.0,
        poster: '/posters/justice league.png',
        // video:'/movies/Bulk.mp4',
        description: 'Controversy between World superheroes and Alien creatures.'
    },
    {
        id: 8,
        title: 'Avengers endgame',
        genre: 'Sci-Fi',
        rating: 9.7,
        poster: '/posters/avengers endgame.png',
        // video:'/movies/Bulk.mp4',
        description: 'The conclusion of the Avengers saga.'
    },
    {
        id: 9,
        title: 'Avengers infinity war I',
        genre: 'Sci-Fi',
        rating: 6.0,
        poster: '/posters/avengers infinity war I.png',
        // video:'/movies/Bulk.mp4',
        description: 'Saga between Avengers and Thanos part one.'
    },
    {
        id: 10,
        title: 'Avengers infinity war II',
        genre: 'Sci-Fi',
        rating: 7.5,
        poster: '/posters/avengers infinity war II.png',
        // video:'/movies/Bulk.mp4',
        description: 'Saga between Avengers and Thanos part two.',
        isFeatured: true
    },
    {
        id: 11,
        title: 'captain america: The first avenger',
        genre: 'Sci-Fi',
        rating: 9.0,
        poster: '/posters/captain_america.webp',
        // video:'/movies/Bulk.mp4',
        description: 'The first movie in the Captain America series.'
    },
    {
        id: 12,
        title: 'Coming to America',
        genre: 'Thriller',
        rating: 5.0,
        poster: '/posters/coming to america.png',
        // video:'/movies/Bulk.mp4',
        description: 'A thrilling tale of a young man.s journey to America.'
    },
    {
        id: 13,
        title: 'Dark Knights',
        genre: 'Sci-Fi',
        rating: 9.3,
        poster: '/posters/Dark knights.png',
        // video:'/movies/Bulk.mp4',
        description: 'A dark and thrilling adventure in a dystopian future.',
        isFeatured: true
    },
    {
        id: 14,
        title: 'Friday the 13th',
        genre: 'Thriller',
        rating: 8.0,
        poster: '/posters/Friday.png',
        // video:'/movies/Bulk.mp4',
        description: 'A chilling horror story that will keep you on the edge of your seat.'
    },
    {
        id: 15,
        title: 'Hallowen',
        genre: 'Drama',
        rating: 9.0,
        poster: '/posters/Hallowen.png',
        // video:'/movies/Bulk.mp4',
        description: 'A haunting tale of a small town plagued by supernatural forces.'
    },
    {
        id: 16,
        title: 'Spider-Man: No Way Home',
        genre: 'Sci-Fi',
        rating: 9.2,
        poster: '/posters/No way home.png',
        // video:'/movies/Bulk.mp4',
        description: 'Spider-Man faces the consequences of his identity being revealed.'
    },
    {
        id: 17,
        title: 'Raiders of the Lost Ark',
        genre: 'Action',
        rating: 7.0,
        poster: '/posters/Raiders.png',
        // video:'/movies/Bulk.mp4',
        description: 'An action-packed adventure in the jungle.',
        isFeatured: true
    },
    {
        id: 18,
        title: 'Star Wars: The Force Awakens',
        genre: 'Action',
        rating: 8.0,
        poster: '/posters/star wars.png',
        //   video:'/movies/Bulk.mp4',
        description: 'The next chapter in the Star Wars saga.'
    },
    {
        id: 19,
        title: 'Step Brothers',
        genre: 'Drama',
        rating: 6.3,
        poster: '/posters/step brothers.png',
        // video:'/movies/Bulk.mp4',
        description: 'A hilarious comedy about two middle-aged men who become step brothers.'
    },
    {
        id: 20,
        title: 'The Gray Man',
        genre: 'Thriller',
        rating: 4.0,
        poster: '/posters/gray man.png',
        // video:'/movies/Bulk.mp4',
        description: 'A thrilling tale of a man on the run from a dangerous organization.'
    },
    {
        id: 21,
        title: 'Shang-Chi and the Legend of the Ten Rings',
        genre: 'Sci-Fi',
        rating: 9.0,
        poster: '/posters/shangchi.jpg',
        // video:'/movies/Bulk.mp4',
        description: 'A martial arts adventure with a mystical twist.',
        isFeatured: true
    },
        
    {
        id: 22,
        title: 'Fast and Furious 10',
        genre: 'Action',
        rating: 7.6,
        poster: '/posters/f10.jpg',
        // video:'/movies/Bulk.mp4',
        description: 'The tenth installment in the Fast & Furious franchise, featuring high-speed action and thrilling stunts.',
        isFeatured: true
    }
    
];

const sampleUsers = [
    {
        id: 1,
        name: 'NZIZA Kalim',
        email: 'nziza@stream.com',
        password: 'user123',
        role: 'user',
        watchlist: [1],
        subscription: 'Basic'
    },
    {
        id: 2,
        name: 'Leuben M',
        email: 'admin@stream.com',
        password: 'admin123',
        role: 'admin',
        watchlist: [1, 2],
        subscription: 'Premium'
    }
];

export const DataProvider = ({ children }) => {
    const [movies, setMovies] = useState(initialMovies);

    const [currentUser, setCurrentUser] = useState(() => {
        if (typeof window === 'undefined') return null;
        const saved = window.localStorage.getItem('currentUser');
        if (!saved) return null;

        try {
            return JSON.parse(saved);
        } catch (error) {
            console.warn('Unable to parse saved currentUser from localStorage:', error);
            window.localStorage.removeItem('currentUser');
            return null;
        }
    });

    useEffect(() => {
        if (currentUser) {
            window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            window.localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const login = ({ email, password }) => {
        const user = sampleUsers.find(
            (account) => account.email === email && account.password === password
        );
        if (!user) {
            return { success: false, error: 'Invalid email or password.' };
        }

        setCurrentUser({...user});
        return { success: true };
    };

    const logout = () => setCurrentUser(null);

    const addMovie = (movie) => {
        setMovies((prev) => [...prev, { ...movie, id: Date.now() }]);
    };

    const deleteMovie = (id) => {
        setMovies((prev) => prev.filter((movie) => movie.id !== id));
        if (currentUser) {
            setCurrentUser((prev) => ({
                ...prev,
                watchlist: prev.watchlist.filter((movieId) => movieId !== id)
            }));
        }
    };

    const addToWatchlist = (id) => {
        if (!currentUser) return;
        setCurrentUser((prev) => ({
            ...prev,
            watchlist: prev.watchlist.includes(id)
                ? prev.watchlist
                : [...prev.watchlist, id]
        }));
    };

    const removeFromWatchlist = (id) => {
        if (!currentUser) return;
        setCurrentUser((prev) => ({
            ...prev,
            watchlist: prev.watchlist.filter((movieId) => movieId !== id)
        }));
    };

    const subscribe = (plan) => {
        if (!currentUser) return;
        setCurrentUser((prev) => ({ ...prev, subscription: plan }));
    };
const featuredMovies = useMemo(() => {
    return movies.filter(movie => movie.isFeatured);
}, [movies]);
    // const featuredMovies = useMemo(() => movies.slice(0, 4), [movies]);
    // const featuredMovies = useMemo(()=> ([movie1, movie2, movie3]);

    const movieStats = useMemo(
        () => ({
            total: movies.length,
            averageRating:
                movies.length > 0
                    ? movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length
                    : 0
        }),
        [movies]
    );

    const isLoggedIn = Boolean(currentUser);
    const isAdmin = currentUser?.role === 'admin';

    return (
        <DataContext.Provider
            value={{
                movies,
                featuredMovies,
                addMovie,
                deleteMovie,
                addToWatchlist,
                removeFromWatchlist,
                currentUser,
                subscribe,
                movieStats,
                login,
                logout,
                isLoggedIn,
                isAdmin,
                sampleUsers
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext);