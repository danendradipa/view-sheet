import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 font-sans">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 ring-1 ring-red-100 dark:ring-red-900/30">
              <AlertTriangle className="h-7 w-7 text-red-600 dark:text-red-400" />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
              Application Error
            </h2>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
              We encountered an unexpected issue. <br />
              <span className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded mt-2 inline-block text-red-600 dark:text-red-400">
                {this.state.error?.message || "Unknown error occurred"}
              </span>
            </p>

            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-white/90 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>

            <p className="mt-6 text-xs text-slate-400 dark:text-slate-600">
              If the problem persists, please check the console.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
