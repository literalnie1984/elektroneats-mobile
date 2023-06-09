# Wymagania

Do uruchomienia aplikacji konieczne jest pobranie i zainstalowanie następujących środowisk i narzędzi:

- [Node.js](https://nodejs.org/en/download) (wersja LTS, użyto: 18.15.0)
- [yarn](https://yarnpkg.com/getting-started/install) (wersja [latest](https://github.com/yarnpkg/berry/releases/latest), użyto: 3.5.0)
- [aplikację Expo](https://play.google.com/store/apps/details?id=host.exp.exponent) (wersja najnowsza, użyto: 2.28.6)

# Jak uruchomić aplikację?

UWAGA! Wszystkie operacje wykonywane w terminalu powinny być dokonywane w katalogu głównym!

1. Stwórz w głównym katalogu plik o nazwie `.env` z poniższą zawartością:

```
API_URL=https://kantyna.mikut.dev/api/
```

2. Zainstaluj wszystkie moduły, wywołując w terminalu:

```bash
yarn
```

3. Po instalacji uruchom aplikację, wywołując:

```bash
yarn expo start
```

Po tym wyświetli się w terminalu kod QR, który należy zeskanować za pomocą pobranej wcześniej aplikacji, odczekać chwilę aż się załaduje i wszystko powinno działać.

# Aplikacja nie działa

1. Uruchomienie aplikacji polega na stworzeniu serwera, do którego można się domyślnie połączyć wyłącznie w sieci lokalnej. Zatem jeżeli nie będzie dało się połączyć czyli kod QR nie będzie działał lub aplikacja będzie się ładować w nieskończoność, to należy wtedy wywołać poniższe polecenie:

```bash
yarn expo start --tunnel -c
```

2. Jeżeli podczas kroku 2. wyskoczy błąd wskazujący na plik yarn.lock, należy ten plik usunąć i ponownie uruchomić komendę

```
yarn
```
# Testowanie płatności

Platforma do obsługi płatności Stripe uruchomiona jest w trybie testowym - zwykłe karty kredytowe nie działają. 

W zamian oferowane są numery testowe - karty te mają zaimplementowane określone funkcje:
- ``` 4242 4242 4242 4242 ``` - karta akceptowana, zawierająca wymaganą ilość funduszy
- ``` 4000 0025 0000 3155 ``` - karta wymagająca potwierdzenia 3D Secure
- ``` 4000 0000 0000 9995 ``` - karta odrzucana, nie posiada funduszy

Numery CVC oraz daty ważności kart można wprowadzić własne - nie mają one znaczenia. 