# Tehisintellekt ja masinõpe (IFI6242.DT)

## Tund 1 – Minimax algoritm ja rekursioon

Esimesel praktikumil läbitud teemad:

- **Praktiline ülesanne (arvumäng +1 ja +2):** Lihtsa mänguloogika realiseerimine, kus osapooled saavad väärtusele kordamööda lisada 1 või 2.
- **Rekursiooni rakendamine:** Mängupuu (game tree) läbimine funktsiooni eneseväljakutse abil kuni baasjuhuni (mängu lõpuni).
- **Minimax algoritmi tuum:** Otsustusmudeli ehitamine, mis eeldab vastase optimaalset käitumist — bot maksimeerib oma võiduvõimalust (`Math.max`), arvestades vastase püüdlust seda minimeerida (`Math.min`).

---

## Kodutöö 1 – Isolation Game

Konsoolipõhine strateegiamäng $N \times N$ ruudustikul, kus mängija võistleb Minimax-algoritmil põhineva boti vastu.

### Mängu reeglid

- Mängijad liiguvad ühise nupuga kordamööda 4 suunas: üles, alla, vasakule või paremale.
- Iga külastatud ruut põletatakse (`[X]`) ja muutub kättesaamatuks.
- Kaotab see, kelle käigukorral pole enam ühtegi vaba ruutu.

### Tehniline teostus

- **Geomeetria ja piirangud (`move`, `getAvailableMoves`):** Kontrollib laua servi ja välistab sisenemise põletatud ruutudesse (`Set`).
- **Otsustamine (`minimax`, `botBestMove`):** Arvutab rekursiivselt läbi kõik võimalikud käiguteed ning valib boti jaoks parima tulemuse (1 = boti võit, 0 = inimese võit).
- **Konsooliliides (`CLI`):** Kuvad reaalajas mängulauda (`[P]` – inimene, `[B]` – bot, `[X]` – põletatud) ja haldab käikude vaheldumist `readline` liidese kaudu.

### Käivitamine

```bash
node isolation.js
```
