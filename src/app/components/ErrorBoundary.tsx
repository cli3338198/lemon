import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Something went wrong...", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong...</div>;
    }

    return this.props.children;
  }
}
