# Portfolio — Kamil Klasa

Portfolio w React, TypeScript i React Router w trybie framework. Motion odpowiada za animacje, Lenis za płynne przewijanie, a czcionka Figtree jest przechowywana lokalnie.

## Uruchomienie

Wymagany Node.js 22.12+.

```sh
npm ci
npm run dev
```

Przed publikacją:

```sh
npm run typecheck
npm run build
npm run preview
```

Gotowe pliki znajdują się w `build/client`. Build generuje HTML strony głównej, O mnie, Kontaktu, Gamingu i wszystkich projektów oraz `sitemap.xml` i `robots.txt`.

Lokalny preview obsługuje te same strony i fallback 404. Dane projektu są odczytywane z modelu podczas prerenderowania oraz przez `clientLoader` w przeglądarce.

## Struktura FSD

Katalog `app/` jest jednocześnie katalogiem aplikacji wymaganym przez React Router i korzeniem warstw FSD:

```text
app/
├── root.tsx, routes.ts       # dokument HTML i konfiguracja tras
├── config/                  # adresy prerenderowania i generowanie plików SEO
├── providers/               # animowane przejścia między stronami
├── styles/                  # style globalne i motywy
├── pages/                   # home, about, contact, gaming, project, not-found
├── widgets/                 # sidebar, footer, portfolio-feed
├── features/                # project-gallery, pixel-arcade
├── entities/project/        # typy, dane i prezentacja projektu
└── shared/                  # konfiguracja, narzędzia i wspólne UI
```

Zależności biegną w dół: `app → pages → widgets → features → entities → shared`. Moduły w jednym slice mogą importować się lokalnie. Importy z innych slice korzystają z ich `index.ts`; strony są niezależnymi modułami tras. Alias `~/` wskazuje `app/`.

Logika efektów i interakcji znajduje się w plikach `*.hooks.ts`, typy domenowe w `*.types.ts`, a moduły stron w `*.page.tsx`. Prosty stan UI może pozostać przy widoku. Nie tworzymy pustych warstw ani dodatkowych wrapperów.

Przyciski odsyłaczy korzystają ze wspólnego `shared/ui/button-link.tsx`: `to` prowadzi do trasy aplikacji, `href` do zwykłego adresu, `variant="light"` wybiera jasny wygląd, a `arrow` dodaje strzałkę. Pozycje menu desktopowego i mobilnego są zapisane w `widgets/sidebar/model/navigation-items.ts`. Nagłówki sekcji O mnie korzystają z lokalnego `AboutSectionHeading`.

Konfiguracja budowania korzysta bezpośrednio z danych w `entities/project/model`, aby nie ładować UI w procesie konfiguracji Vite.

## Edycja treści

- `app/shared/config/profile.ts` — dane autora i linki kontaktowe.
- `app/entities/project/model/business-projects.ts` — projekty biznesowe.
- `app/entities/project/model/gaming-projects.ts` — projekty gamingowe.
- `app/entities/project/model/project.types.ts` — model projektu i zdjęć galerii.
- `app/pages/` — treści podstron.
- `app/shared/ui/technology-badges.tsx` i `app/shared/config/technology.types.ts` — technologie oraz ich ikony.
- `app/styles/global.css` — wygląd, układy responsywne i motyw gamingowy.
- `public/images/` — używane okładki i zdjęcia galerii.
- `public/favicon.ico` — ikona w rozmiarach 16, 32, 48, 64 i 96 px.

Projekt wymaga co najmniej jednego zdjęcia w `gallery`. Zdjęcie zawiera ścieżkę, tekst alternatywny, podpis i wymiary. Karty projektów i zdjęcia galerii korzystają ze wspólnego komponentu `ProjectPreview`: wyśrodkowany zrzut w ramie, bez przycinania, na tle przypisanym do projektu.

Obrazy rastrowe w `public/images/` są zapisane jako WebP w jakości 95, z zachowaniem rozdzielczości źródeł i przezroczystości avatara. Ikony SVG pozostają wektorowe.

Po dodaniu albo usunięciu projektu adresy prerenderowania i sitemap aktualizują się automatycznie. Ich wspólna lista znajduje się w `app/config/prerender.ts`; generowanie plików SEO realizuje `app/config/seo.ts` wywoływany przez plugin Vite podczas budowania.

## Domena i hosting

Ustaw `VITE_SITE_URL` w `.env` na podstawie `.env.example` albo jako argument budowania. Wartość musi być adresem HTTP(S) bez ścieżki. Domyślnie używane jest `https://kamilklasa.pl`. Canonical, Open Graph, JSON-LD, sitemap i robots korzystają z tej samej domeny.

Repozytorium zawiera `Dockerfile` i `nginx.conf`. Kontener buduje stronę i udostępnia pliki przez Nginx na porcie 80:

```sh
docker build --build-arg VITE_SITE_URL=https://twoja-domena.pl -t kamil-portfolio .
docker run --rm -p 127.0.0.1:8080:80 kamil-portfolio
```

W Dokploy wybierz budowanie z `Dockerfile`, dodaj argument `VITE_SITE_URL`, podłącz domenę do portu 80 i włącz HTTPS. Po zmianie domeny przebuduj obraz. Na innym hostingu zapewnij obsługę `index.html` w katalogach oraz `__spa-fallback.html` ze statusem HTTP 404 dla nieznanych adresów. Prerenderowane strony powinny mieć pierwszeństwo przed fallbackiem.

## Interakcje i materiały

Galeria korzysta z natywnego dialogu, obsługuje Escape, strzałki i blokadę przewijania. Menu mobilne przywraca przewijanie po zamknięciu. Animacje uwzględniają `prefers-reduced-motion`; logika przewijania znajduje się w `app/shared/lib/smooth-scroll/`.

Zdjęcia projektów są zrzutami stron i aplikacji. FizjoMiara pokazuje fikcyjne dane przykładowego pacjenta. Sagi prezentuje kolekcję i kartę produktu ze sklepu. Dane dostępowe nie są częścią projektu. Rok i technologie pozostawione puste w danych należy uzupełnić zgodnie z realizacją.

Figtree jest udostępniana na licencji SIL Open Font License w `public/fonts/OFL.txt`. Valibot używa logo w `public/icons/valibot.svg`.
