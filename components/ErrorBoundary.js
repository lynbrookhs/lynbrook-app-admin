import { Alert, AlertTitle } from "@material-ui/lab";
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          An unexpected error occurred while rendering this page.
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
