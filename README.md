# mikael.david@hmail.com

TODO INSTALL

## Install temporaire
1. Installez:
 - nodeJS
 - git
 - composer

2. Exécutez les commandes (première install):
```console
bower install
npm install
gulp prod

composer update
composer global require friendsofphp/php-cs-fixer
npm install -g gulp bower yarn eslint
yarn install
bower install
php cli.php teams tasks elasticsearch create
php cli.php teams tasks elasticsearch synchronize
```

5. Watcher les sources JS/CSS/... en développement:
```console
gulp --dev
```

6. Grumphp peut vous refuser un commit s'il a détecter une erreur (via php-cs-fixer).
   Pour fixer automatiquement le fichier qui vous pose problème, il faut exécuter la commander:
```console
php-cs-fixer fix [path/file]
```

7. Lors de vos dev, un linter JS vérifie votre code et affiche les éventuelles erreurs ou warning.
   Pour fixer certaines erreurs automatiquement, il faut exécuter la commande:
```console
eslint [path/file] --fix
```

8. Lancement du serveur node des teams
Production:
```console
npm run start:server-team
```

Dev:
```console
npm run start:server-team-dev
```