import { Component, type ErrorInfo, type ReactNode } from 'react'

export class ChartErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Failed to load or render financial charts.', error, info.componentStack)
  }

  render() {
    if (this.state.failed) {
      return (
        <div role="alert" className="xl:col-span-2 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground">
          <p>Financial charts could not be loaded.</p>
          <button
            type="button"
            className="mt-2 underline"
            onClick={() => window.location.reload()}
          >
            Reload page to try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
