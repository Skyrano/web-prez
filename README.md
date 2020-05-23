Application web réalisée par Kiéran Goyat et Alistair Rameau

Github : https://github.com/Skyrano/web-prez

Cette application permet de visualiser les informations sur les résultats des élections présidentielles à Rennes pour les années 2007 à 2017.

Compatibilité : Testé positivement avec Google Chrome, Mozilla Firefox et Microsoft Edge.

Getting Started :

- Installez npm, le gestionnaire de paquet de Node.js, téléchargable depuis le site https://nodejs.org/en/download/.

- Une fois npm installé, changez le répertoire courant vers le dossier GRP10-projet-web.

- Installez le framework Angular Core et CLI en tant que bibliothèques globales pour pouvoir lancer l'application. L'installation peut se faire avec les commandes "npm install -g npm@latest" et "npm install -g @angular/cli" (il faudra sûrement lancer ces commandes en temps qu'administrateur/sudo).  

- Ensuite, lancez la commande "npm install" qui va installer automatiquement le reste des dépendances requises pour l'application, qui sont listées dans le fichier package.json.

- Si certains paquets présentent des vulnérabilités à cause de paquets listés dans package.json dans lesquels on aurait trouvé des failles récemment, il est possible de fixer automatiquement les failles demandant une simple mise à jour à l'aide la commande "npm audit fix".

- Une fois toutes les dépendances installées, il suffit de lancer la commande "ng serve" depuis ce dossier pour lancer l'application web. Après compilation des sources, celle-ci sera accessible à l'adresse http://localhost:4200/ (par défaut) depuis le navigateur.

Utilisation :

L'application se présente sous la forme d'une single page application composée d'une zone centrale contenant les informations et de 2 zones aux extrémités hautes et basses permettant d'accéder à d'autres informations. Une présentation des différentes parties :

- La page Accueil affichée par défaut est la page principale de l'application, et permet d'afficher toutes les informations liées aux élections. Cette zone est principalement composée d'une carte (centrée sur Rennes par défaut) et d'une zone indiquant la liste des candidats ainsi que leur score respectif. Trois menus déroulants (deux au dessus de la carte, un au dessus des candidats) permettent de changer ou préciser les informations voulues (une autre élection, un autre tour ou les informations d'un bureau particulier). De plus, les emplacements des bureaux apparaissent sur la carte et il est possible de cliquer dessus afin d'afficher les informations électorales de ceux-ci. 

- La page Contact contient nos informations afin de pouvoir nous contacter plus facilement via notre adresse mail étudiante ou personnelle.

- La page Aide contient cette présente information indiquant le contenu général du site.

- La page Mentions Légales contient une digression peu pertinente sur la légalité du site actuel, au vu du fait que celui-ci est créé dans le cadre d'un projet scolaire.
