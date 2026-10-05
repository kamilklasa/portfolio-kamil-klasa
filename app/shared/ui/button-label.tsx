export function ButtonLabel({ children }: { children: string }) {
  return (
    <span className="button-label">
      <span className="button-label-current">{children}</span>
      <span className="button-label-next" aria-hidden="true">
        {children}
      </span>
    </span>
  );
}
