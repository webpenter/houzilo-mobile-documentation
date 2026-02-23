import React, { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  public handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public handleReload = () => {
    window.location.reload();
  };

  public handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
                  <p className="text-rose-100 text-sm mt-1">The application encountered an unexpected error</p>
                </div>
              </div>
            </div>

            {/* Error Details */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900 mb-2">What happened?</h2>
                <p className="text-slate-600 leading-relaxed">
                  A component in the application failed to render properly. This is likely a temporary issue.
                  Try reloading the page or going back to the home page.
                </p>
              </div>

              {this.state.error && (
                <details className="mb-6 group">
                  <summary className="cursor-pointer text-sm font-bold text-slate-700 hover:text-rose-600 transition-colors list-none flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider">Technical Details</span>
                    <span className="text-xs text-slate-400">(Click to expand)</span>
                  </summary>
                  <div className="mt-4 p-4 bg-slate-900 rounded-xl overflow-auto max-h-64">
                    <p className="text-red-400 font-mono text-xs mb-2 font-bold">
                      {this.state.error.name}: {this.state.error.message}
                    </p>
                    {this.state.error.stack && (
                      <pre className="text-slate-400 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={this.handleReload}
                  className="flex-1 flex items-center justify-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
                >
                  <RefreshCw size={18} />
                  Reload Page
                </button>
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-all"
                >
                  <Home size={18} />
                  Go to Home
                </button>
              </div>

              {/* Support Info */}
              <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs text-slate-600 text-center">
                  If this problem persists, please contact support or check the browser console for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
