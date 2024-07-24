import { Component, ErrorInfo, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log("Something went wrong...", error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <div>Something went wrong... `${this.state.error.message}`</div>;
    }

    return this.props.children;
  }
}
