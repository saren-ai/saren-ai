export default function PagefindBoundary({
  section,
  title,
  children,
}: {
  section: string;
  title?: string;
  children: React.ReactNode;
}) {
  const meta = title ? `section:${section}, title:${title}` : `section:${section}`;
  return (
    <div data-pagefind-body data-pagefind-meta={meta}>
      {children}
    </div>
  );
}
