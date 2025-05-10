
export const Link = ({ href, variant = "primary", className = "", children = undefined }) => {
  return (
    <a href={href} target="_blank"
      className={"link-" + variant + " " + className}>
      {children}
    </a>
  );
};