import { Link } from "~/shared/ui/navigation-link";
import { Arrow } from "~/shared/ui/icons";
import { ButtonLabel } from "~/shared/ui/button-label";
import { BusinessGlobe } from "./business-globe";

export function GamingTeaser({ business = false }: { business?: boolean }) {
  return (
    <section
      className={`gaming-teaser${business ? " gaming-teaser-business" : ""}`}
      aria-labelledby="gaming-teaser-title"
    >
      <div className="gaming-teaser-copy">
        <span className="gaming-teaser-label">
          {business ? "Biznes" : "Gaming"}
        </span>
        <h2 id="gaming-teaser-title">
          {business ? "Projekty dla biznesu." : "Strony dla świata gamingu."}
        </h2>
        <p>
          {business
            ? "Strony internetowe i produkty cyfrowe. Poznaj biznesową stronę mojego portfolio."
            : "Projekty dla serwerów i społeczności graczy. Poznaj drugą stronę mojego portfolio."}
        </p>
        <Link to={business ? "/" : "/gaming"} className="gaming-teaser-link">
          <ButtonLabel>
            {business
              ? "Zobacz projekty biznesowe"
              : "Zobacz projekty gamingowe"}
          </ButtonLabel>
          <span className="gaming-teaser-arrow">
            <Arrow diagonal />
          </span>
        </Link>
      </div>
      {business ? (
        <BusinessGlobe />
      ) : (
        <div className="gaming-teaser-pixels" aria-hidden="true">
          {[1, 0.55, 0.3].map((opacity, index) => (
            <svg
              key={index}
              viewBox="8 6 64 40"
              fill="currentColor"
              style={{ opacity }}
            >
              <path d="M24 6h8v8h-8zm24 0h8v8h-8zM16 14h48v8H16zM8 22h16v8H8zm24 0h16v8H32zm24 0h16v8H56zM16 30h48v8H16zM16 38h8v8h-8zm40 0h8v8h-8z" />
            </svg>
          ))}
        </div>
      )}
    </section>
  );
}
