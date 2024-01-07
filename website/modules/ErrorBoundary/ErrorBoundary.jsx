import React from "react";
import * as Sentry from "@sentry/browser";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // console.log("hereee logged");
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    Sentry.captureException(error);
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    Sentry.captureException(error);
    // console.log("error", error, errorInfo);
    console.log({ error, errorInfo });
  }

  render() {
    // console.log(this.state);
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, Something went wrong</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
