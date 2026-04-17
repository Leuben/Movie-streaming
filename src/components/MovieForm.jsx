import { useState } from 'react';
import { TextField, Button, MenuItem, Box } from '@mui/material';
import { useData } from '../context/DataContent';
import { validateFile } from '../utils/validation';

const genres = ['Action', 'Drama', 'Sci-Fi', 'Comedy', 'Thriller'];

export default function MovieForm() {
    const { addMovie } = useData();
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('Action');
    const [rating, setRating] = useState(8);
    const [previews, setPreviews] = useState([]);

    const handleFile = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(validateFile);
        
        if (validFiles.length !== files.length) {
            alert('Some files were rejected. Please select PNG or JPEG images under 2MB.');
        }

        const newPreviews = validFiles.map(f => URL.createObjectURL(f));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const handleSubmit = () => {
        if (!title.trim() || previews.length === 0) {
            alert('Please add a title and at least one poster image.');
            return;
        }

        addMovie({
            title: title.trim(),
            poster: previews[0],
            thumbnails: previews,
            genre,
            rating: Number(rating),
            description: 'New release added by admin.'
        });

        setTitle('');
        setGenre('Action');
        setRating(8);
        setPreviews([]);
    };

    return (
        <div style={styles.form}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                select
                label="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                fullWidth
                margin="normal"
            >
                {genres.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label="Rating"
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ min: 1, max: 10, step: 0.1 }}
            />
            <label style={styles.uploadLabel}>
                Upload Posters & Thumbnails
                <input type="file" multiple accept="image/png,image/jpeg" onChange={handleFile} style={styles.fileInput} />
            </label>
            {previews.length > 0 && (
                <Box display="flex" gap="12px" flexWrap="wrap" mt={2}>
                    {previews.map((src, index) => (
                        <img key={index} src={src} alt={`Preview ${index}`} style={styles.preview} />
                    ))}
                </Box>
            )}
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                Add Movie
            </Button>
        </div>
    );
}

const styles = {
    form: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--surface)',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow)'
    },
    uploadLabel: {
        marginTop: '16px',
        padding: '12px 18px',
        borderRadius: '8px',
        backgroundColor: 'var(--surface-strong)',
        color: 'var(--text)',
        cursor: 'pointer',
        display: 'inline-block'
    },
    fileInput: {
        display: 'none'
    },
    preview: {
        width: '100px',
        height: '140px',
        objectFit: 'cover',
        borderRadius: '8px',
        border: '1px solid var(--border)'
    }
};