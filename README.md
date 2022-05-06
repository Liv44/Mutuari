# Projet Mutuari

## Description du projet

Suite à la demande du référent du matériel Audiovisuel de Nantes Ynov Campus, nous avons choisi de développer une solution d'emprunt de matériels via une application web, dans le cadre du projet de fin d'année de Bachelor 2 Informatique. Nous l'avons nommé **Mutuari** _(signifiant emprunter en latin)_. Elle permettra de répertorier tout le matériel mis à disposition des élèves et de rendre les emprunts plus simple, avec un suivi via un panel administrateur.
Pour correspondre aux critères demandés pour le projet de fin d'année, nous avons rajouté la possibilité de signer l'emprunt et le retour via une tablette Raspberry.

## Lancement du projet

- Aller dans le dossier `server` et lancer la commande `npm install` qui installera tous les modules npm, puis lancer la commande `npm start`
- Aller dans le dossier `client` et lancer la commande `npm install` puis lancer la commande `npm start`

## MVP de la V1 :

Au vu du nombre de fonctionnalités attendues pour l'application, nous avons décidé de réfléchir au MVP (Minimum Viable Product) afin de rendre un projet fonctionnel, avec les bases attendues.

### ADMINISTATEUR

- Possibilité de se connecter en tant qu’administrateur
- Possibilité de visualiser le calendrier des emprunts
- Possibilité d’ajouter, supprimer, modifier du matériel
- Possibilité d'accepter/refuser l'emprunt d'un matériel

### Tablette Rasberry Pi

- Possibilité de rentrer son nom + prénom + signature lors de l’emprunt et du retour du matériel

### UTILISATEUR

- possibilité de créer un compte utilisateur.
- possibilité de se connecter.
- possibilité de réserver du matériel. (L’emprunteur réservera via un formulaire.)
- possibilité d’avoir une fiche d’emprunt à imprimer, télécharger ?

## Explication de la structure

Nous avons 2 dossiers :

- un dossier `server` qui contient tous les fichiers relatifs au serveur
  **Le serveur écoute sur le port 3001**
- un dossier `client` qui contient tous les fichiers relatifs au frontend
  Dans le fichier package.json, il y a une ligne qui permet de mettre un `proxy` :
  ```json
  "proxy": "http://localhost:3001",
  ```
  Cette ligne va permettre de faire le lien entre le serveur et le client.
  Cela nous permettra de faire des requêtes à notre serveur Node sans avoir à fournir l'origine sur laquelle il s'exécute (http://localhost:3001) à chaque fois que nous lui ferons une requête réseau.
  **Le client écoute sur le port 3000**

## Chakra UI

Nous avons décidé d'utiliser une bibliothèque de composants. Nous avons choisi Chakra UI car nous avons déjà travaillé avec Native Base (React Native) qui s'en rapproche fortement.
