import React from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center p-8 h-screen text-center bg-gray-50">
          <AlertCircle size={48} className="text-danger mb-4" />
          <h1 className="text-xl mb-2">Something went wrong.</h1>
          <p className="text-muted text-sm mb-6">NutriSmart AI encountered a fatal error. Please reload the application.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
