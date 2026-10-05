import { ButtonLink } from "~/shared/ui/button-link";
export function meta() {
  return [
    { title: "404 — Kamil Klasa" },
    { name: "robots", content: "noindex" },
  ];
}
export default function NotFound() {
  return (
    <section className="page-panel error-page">
      <span className="eyebrow">404</span>
      <h1>
        Ten adres nie prowadzi
        <br />
        do żadnego projektu.
      </h1>
      <ButtonLink to="/">Wróć na początek</ButtonLink>
    </section>
  );
}
