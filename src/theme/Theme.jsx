import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext();

const buildMuiTheme = (mode) => {
    const palette =
        mode === 'dark'
            ? {
                background: {
                    default: '#090909',
                    paper: '#111111'
                },
                text: {
                    primary: '#f7f7f7',
                    secondary: '#b3b3b3'
                },
                divider: 'rgba(255, 255, 255, 0.08)'
            }
            : {
                background: {
                    default: '#f4f5f7',
                    paper: '#ffffff'
                },
                text: {
                    primary: '#141414',
                    secondary: '#6b7280'
                },
                divider: 'rgba(0, 0, 0, 0.08)'
            }

    return createTheme({
        typography: {
            fontFamily: "'Roboto', Arial, sans-serif"
        },
        palette: {
            mode,
            primary: {
                main: '#e50914'
            },
            background: palette.background,
            text: palette.text,
            divider: palette.divider
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        backgroundColor: palette.background.default,
                        color: palette.text.primary,
                        transition: 'background 0.3s ease, color 0.3s ease'
                    },
                    input: {
                        color: palette.text.primary
                    },
                    textarea: {
                        color: palette.text.primary
                    },
                    select: {
                        color: palette.text.primary
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'var(--surface)',
                        color: 'var(--text)',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--border)'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'var(--border)'
                        }
                    }
                }
            },
            MuiInputBase: {
                styleOverrides: {
                    input: {
                        color: 'var(--text)'
                    }
                }
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: 'var(--muted)'
                    }
                }
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: 'var(--muted)'
                    }
                }
            },
            MuiFormControlLabel: {
                styleOverrides: {
                    label: {
                        color: 'var(--text)'
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        borderRadius: '999px',
                        color: 'var(--button-text)',
                        '&.MuiButton-outlined': {
                            backgroundColor: 'var(--surface-strong)'
                        }
                    },
                    contained: {
                        color: 'var(--button-text)',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: '#c40711'
                        }
                    },
                    containedPrimary: {
                        backgroundColor: 'var(--primary)',
                        color: '#fff',
                        '&:hover': {
                            backgroundColor: '#c40711'
                        }
                    },
                    outlined: {
                        borderColor: 'var(--border)',
                        color: 'var(--button-text)',
                        backgroundColor: 'var(--surface-strong)',
                        '&:hover': {
                            backgroundColor: 'var(--surface)'
                        }
                    },
                    text: {
                        color: 'var(--primary)'
                    }
                }
            },
            MuiCheckbox: {
                styleOverrides: {
                    root: {
                        color: 'var(--text)'
                    }
                }
            },
            MuiDialog: {
                styleOverrides: {
                    paper: {
                        backgroundColor: 'var(--surface)'
                    }
                }
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: 'var(--surface)'
                    }
                }
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        color: 'var(--text)'
                    }
                }
            }
        }
    });
};

export const ThemeProvider = ({ children }) => {
    const [colorScheme, setColorScheme] = useState(() => {
        const stored = window.localStorage.getItem('theme');
        return stored === 'light' ? 'light' : 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', colorScheme);
        window.localStorage.setItem('theme', colorScheme);
    }, [colorScheme]);

    const toggleColorScheme = () => {
        setColorScheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    const value = useMemo(
        () => ({ colorScheme, toggleColorScheme }),
        [colorScheme]
    );

    const muiTheme = useMemo(() => buildMuiTheme(colorScheme), [colorScheme]);

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
