'use client';

import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError ) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#181818] p-6">
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-md w-full">
            <div className="text-5xl font-bold mb-4 text-red-400 drop-shadow animate-pulse">😢 Oops!</div>
            <h1 className="text-2xl font-semibold mb-2 text-white">Something went wrong</h1>
            <p className="text-center max-w-lg mb-4 text-red-200">{this.state.error?.message}</p>
            <button
              className="px-5 py-2 bg-red-500/80 hover:bg-red-600/90 text-white font-semibold rounded-lg shadow transition"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
