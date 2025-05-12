
export const Loading = (props) => {
  const { className } = props;
  return (
    <div {...props} className={`spinner-border ${className}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
