import ErrorBoundary from "components/ErrorBoundary";

const EmptyLayout = ({ children }) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default EmptyLayout;
