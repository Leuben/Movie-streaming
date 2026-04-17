import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './theme/Theme'
import { DataProvider } from './context/DataContent'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'
import Movies from './pages/Movies'
import Profile from './pages/Profile'
import Subscription from './pages/Subscription'
import Login from './pages/Login'

class AppErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={fallbackStyles.page}>
                    <h1>Something went wrong</h1>
                    <pre style={fallbackStyles.message}>{this.state.error?.toString()}</pre>
                </div>
            )
        }

        return this.props.children
    }
}

const fallbackStyles = {
    page: {
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        padding: '32px'
    },
    message: {
        color: 'var(--muted)',
        whiteSpace: 'pre-wrap',
        marginTop: '16px'
    }
}

export default function App() {
    return (
        <ThemeProvider>
            <DataProvider>
                <AppErrorBoundary>
                    <Router>
                        <Navbar />
                        <div className="container">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/movies" element={<Movies />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/subscription" element={<Subscription />} />
                                <Route path="*" element={<Home />} />
                                <Route path="/admin" element={<Admin />} />
                            </Routes>
                        </div>
                    </Router>
                </AppErrorBoundary>
            </DataProvider>
        </ThemeProvider>
    )
}
