import { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { WalletContextProvider } from './providers/WalletContextProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import '@solana/wallet-adapter-react-ui/styles.css';

// Lazy load Dashboard to prevent any SDK initialization issues during import
const Dashboard = lazy(() => import('./components/Dashboard').then(m => ({ default: m.Dashboard })));

function LoadingFallback() {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Loading...</div>
        </div>
    );
}

function App() {
    console.log('App: Rendering...');

    return (
        <ErrorBoundary>
            <WalletContextProvider>
                <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8 pb-24">
                        <Suspense fallback={<LoadingFallback />}>
                            <Dashboard />
                        </Suspense>
                    </main>
                </div>
            </WalletContextProvider>
        </ErrorBoundary>
    );
}

export default App;
