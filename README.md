# LaChaudièreAgenda.web
Membres: Carette Robin, OUDER Nathan, ANDRIEU Paul, BLONBOU Mathys, LAMBERT Valentino

## Présentation

LaChaudièreAgenda.web est une application web monopage (SPA) permettant de naviguer et de consulter l’agenda culturel de La Chaudière.  
Elle consomme l’API LaChaudièreAgenda.core (dockerisée) pour :  
- Afficher la liste des événements  
- Filtrer, trier et parcourir par catégories  
- Consulter le détail complet d’un événement  

L’application est développée en JavaScript moderne (ES Modules + Handlebars) et stylée avec Tailwind CSS. Elle illustre les bonnes pratiques : modularisation du code, usages asynchrones (fetch + promesses), templates Handlebars et manipulation du DOM.

---

## Fonctionnalités

### Navigation et affichage de base
1. **Événements du mois courant**  
   - Affichage en carte de chaque événement : titre, date, catégorie  
   - Exemple de la page d’accueil :  

2. **Filtrage par catégorie**  
   - Menu déroulant dynamique  
   - Permet d’isoler une catégorie et de rafraîchir la liste sans rechargement (SPA)  

3. **Affichage par catégories**  
   - Page liste des catégories  
   - Clic sur une vignette → liste des événements du mois de cette catégorie  

4. **Détail d’un événement**  
   - Page détaillée avec titre, date, catégorie, description (Markdown → HTML)  

### Extensions
5. **Affichage périodes passées / futures**  
   - Choix “Passés”, “Courant”, “À venir” pour naviguer dans le temps  
6. **Tri**  
   - Par date (asc/desc), par titre, etc...
7. **Affichage de l’image**  
   - Si l’API renvoie une image, elle s’affiche en en-tête de la carte  
8. **Événements favoris**  
   - Marquage via icône “⭐”  
   - Sauvegarde dans le `localStorage` pour accès rapide  

---

## Screenshots



| Accueil      | Page Évenements           | Page Favoris            |
|----------------------------|--------------------------|----------------------------|
| ![home](https://github.com/user-attachments/assets/852b7cd4-c4ee-4287-ae8e-fdd369831ce3) | ![events](https://github.com/user-attachments/assets/6a97fd70-6f75-4989-a95b-dcd158eb1dfa) | ![image](https://github.com/user-attachments/assets/cae3307e-ac8f-4f1b-9b42-8fc81e5a5b0c) |

| Page catégories            |  Page des événements par catégorie  | Page détail événement    |
|----------------------------|-------------------------------------|--------------------------|
| ![cats](https://github.com/user-attachments/assets/0847b1a3-7574-4d55-9029-271d49924a96) | ![image](https://github.com/user-attachments/assets/ef876e23-b29b-4000-bdf4-33c952051389) | ![detail](https://github.com/user-attachments/assets/bb831c2c-8628-43b2-b279-7e8905f17d17) |

---

## Installation et lancement

### Prérequis

- Docker & Docker Compose  
- Node.js  / npm  
- Un terminal Linux / macOS / WSL

### 1. Cloner le dépôt

```bash
git clone https://github.com/CaretteRobin/LaChaudiereAgenda.web.git
cd LaChaudiereAgenda.web
npm install
npm run build
```

### 2. Cloner le dépôt du backend et le lancer

```bash
git clone https://github.com/CaretteRobin/Chaudiere.core.git
cd Chaudiere.core
docker compose build
docker compose up -d
```

### 3. Retourner dans le dépôt du web

```bash
npm run preview
```

Cliquez sur le lien proposé et vous voila sur le projet web LaChaudière
