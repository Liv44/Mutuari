# Projet Mutuari

## Description du projet

## Explication de la structure

Nous avons 2 dossiers :
- un dossier `server` qui contient tous les fichiers relatifs au serveur
    **Le serveur écoute sur le port 3001**
- un dossier `client` qui contient tous les fichiers relatifs au frontend
    Dans le fichier package.json, il y a une ligne qui permet de mettre un ``proxy`` :
    ```json
    "proxy": "http://localhost:3001",
    ```
    Cette ligne va permettre de faire le lien entre le serveur et le client.
    Cela nous permettra de faire des requêtes à notre serveur Node sans avoir à fournir l'origine sur laquelle il s'exécute (http://localhost:3001) à chaque fois que nous lui ferons une requête réseau.
    **Le client écoute sur le port 3000**