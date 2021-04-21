/**
 * @param {object}props - Props.
 * @param {JSX.Element} props.children - Children to render.
  @returns {JSX.Element} - Layout component of the app.
 */
export function Layout({
  children,
}: {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
}): JSX.Element {
  return <div>{children}</div>;
}
