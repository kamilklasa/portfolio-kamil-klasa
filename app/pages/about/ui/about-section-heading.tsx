export type AboutSectionHeadingProps = {
  id: string;
  number: number;
  children: string;
  label?: string;
};

export function AboutSectionHeading({
  id,
  number,
  children,
  label,
}: AboutSectionHeadingProps) {
  return (
    <div className="about-section-heading">
      <span aria-hidden="true">{String(number).padStart(2, "0")}</span>
      <h2 id={id}>{children}</h2>
      {label && <span>{label}</span>}
    </div>
  );
}
