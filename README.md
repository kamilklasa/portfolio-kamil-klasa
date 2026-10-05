# Kamil Klasa — portfolio

Moje portfolio z projektami webowymi i gamingowymi. Są tu opisy realizacji, galerie, kilka słów o mnie i kontakt.

Strona jest napisana w React i TypeScript, z React Routerem do obsługi podstron. Za animacje odpowiada Motion, a za płynne przewijanie Lenis. Czcionka Figtree jest dołączona do projektu i ładuje się lokalnie.

## Uruchomienie lokalnie

Potrzebujesz Node.js 22.12 lub nowszego.

```sh
npm ci
npm run dev
```

## Build i podgląd

Żeby sprawdzić stronę przed wdrożeniem:

```sh
npm run typecheck
npm run build
npm run preview
```

Podgląd będzie dostępny pod `http://127.0.0.1:4173`. Gotowe pliki trafiają do `build/client`.

Build przygotowuje osobny HTML dla każdej podstrony, w tym wszystkich projektów. Generuje też `sitemap.xml` i `robots.txt`. Na serwerze wystarczy więc udostępnić gotowe pliki.

## Co jest gdzie

Kod jest podzielony według Feature-Sliced Design. W praktyce najważniejsze katalogi to:

```text
app/
├── root.tsx, routes.ts       # główny dokument i lista tras
├── config/                  # lista podstron i generowanie plików SEO
├── providers/               # przejścia między stronami
├── styles/                  # style i motywy
├── pages/                   # poszczególne podstrony
├── widgets/                 # menu, stopka i lista projektów
├── features/                # galeria i minigra
├── entities/project/        # dane projektów i ich komponenty
└── shared/                  # wspólne komponenty, ustawienia i narzędzia
```

Alias `~/` wskazuje katalog `app/`. Logika interakcji jest w plikach `*.hooks.ts`, typy w `*.types.ts`, a widoki stron w `*.page.tsx`.

## Edycja treści

- `app/shared/config/profile.ts` — dane i linki kontaktowe.
- `app/entities/project/model/business-projects.ts` — projekty biznesowe.
- `app/entities/project/model/gaming-projects.ts` — projekty gamingowe.
- `app/pages/` — treści podstron.
- `app/shared/ui/technology-badges.tsx` i `app/shared/config/technology.types.ts` — technologie oraz ich ikony.
- `app/styles/global.css` — wygląd strony i motyw gamingowy.
- `public/images/` — okładki i zdjęcia galerii w formacie WebP.

Nowy projekt dodaj do odpowiedniego pliku z danymi. Każdy projekt musi mieć przynajmniej jedno zdjęcie w `gallery`, ze ścieżką, opisem alternatywnym, podpisem i wymiarami. Strukturę danych znajdziesz w `app/entities/project/model/project.types.ts`.

Po dodaniu lub usunięciu projektu kolejny build zaktualizuje listę podstron i sitemapę.

## Domena i hosting

Adres strony ustawia zmienna `VITE_SITE_URL`. Domyślnie jest to `https://kamilklasa.pl`. Jeśli używasz innej domeny, skopiuj `.env.example` do `.env` i zmień wartość:

```dotenv
VITE_SITE_URL=https://twoja-domena.pl
```

Podaj sam adres z `https://` lub `http://`, bez ścieżki, parametrów i fragmentu po `#`. Na jego podstawie powstają adresy w metadanych strony, sitemapie i `robots.txt`.

### Dokploy

W repo jest gotowy `Dockerfile`. Buduje stronę, a potem uruchamia Nginx, który udostępnia pliki na porcie 80.

Po podłączeniu repozytorium w Dokploy ustaw:

1. **Build Type:** `Dockerfile`.
2. **Dockerfile Path:** `Dockerfile`, **Docker Context Path:** `.`. Pole **Docker Build Stage** zostaw puste.
3. W **Environment → Build Time Arguments** dodaj `VITE_SITE_URL=https://twoja-domena.pl`.
4. Dodaj domenę, skieruj ją na port kontenera **80** i włącz HTTPS.
5. Uruchom wdrożenie.

Adres domeny jest zapisywany w plikach podczas budowania. Po jego zmianie trzeba ponownie zbudować i wdrożyć stronę.

### Docker lokalnie

Jeśli chcesz sprawdzić kontener na swoim komputerze:

```sh
docker build --build-arg VITE_SITE_URL=https://twoja-domena.pl -t kamil-portfolio .
docker run --rm -p 127.0.0.1:8080:80 kamil-portfolio
```

Strona będzie dostępna pod `http://127.0.0.1:8080`.

Nginx obsługuje adresy podstron, cache zasobów i stronę błędu ze statusem 404. Przy wdrożeniu na innym hostingu zadbaj o te same zasady: najpierw plik `index.html` danej podstrony, a dla nieznanych adresów `__spa-fallback.html` ze statusem 404.

## Materiały

Zdjęcia projektów to zrzuty ekranów stron i aplikacji. Dane pacjenta widoczne w projekcie FizjoMiara są fikcyjne.

Czcionka Figtree jest udostępniana na licencji SIL Open Font License. Treść licencji znajduje się w [public/fonts/OFL.txt](public/fonts/OFL.txt).
