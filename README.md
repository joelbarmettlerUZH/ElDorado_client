# SopraFs18TemplateClient

                                                                                                                                                                 
                                        ad88888ba     ,ad8888ba,    88888888ba   88888888ba          db             
                                       d8"     "8b   d8"'    `"8b   88      "8b  88      "8b        d88b              
                                       Y8,          d8'        `8b  88      ,8P  88      ,8P       d8'`8b               
                                       `Y8aaaaa,    88          88  88aaaaaa8P'  88aaaaaa8P'      d8'  `8b               
                                         `"""""8b,  88          88  88""""""'    88""""88'       d8YaaaaY8b                
                                               `8b  Y8,        ,8P  88           88    `8b      d8""""""""8b               
                                       Y8a     a8P   Y8a.    .a8P   88           88     `8b    d8'        `8b                 
                                        "Y88888P"     `"Y8888Y"'    88           88      `8b  d8'          `8b                 

                                                                                                                                                          
## STOP! First you have to be familiar with this before you start
Read and go through those Tutorials, It will make your life easier!

  - Read the [Angular Docs](https://angular.io/docs/ts/latest/guide/)
  - Do this [Angular - Getting Started Tutorial](https://angular.io/docs/ts/latest/tutorial/)
  - Get an Understanding of [CSS](https://www.w3schools.com/css/) and [HTML](https://www.w3schools.com/html/)! 
                                                                              
## Prerequisites and Installation

Both the CLI and generated project have dependencies that require Node 8.9.4 together
with NPM 5.6.0.

  1. Download [Node](https://nodejs.org/en/download/) and install it.
  2. Install `Angular-CLI` via terminal with the command: `npm install -g @angular/cli@latest`
  3. Install [Git](https://git-scm.com/downloads)
  4. Clone this template with `git clone https://github.com/sealuzh/sopra-fs18-template-client.git`
  5. Open terminal and go to the project folder (client-template)
  6. execute: `npm install` for installing the dependencies
  7. execute: `npm start`  for starting the application

## Run a Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. You wont be able to communcate with the server --> see next section if you want to do requests on the backend.

## Run a Development server with proxy to backend (server-template)
Run `npm start` for a dev server + proxy (This will simply run `ng serve --proxy-config proxy.conf.json`, see package.json).
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
The Server must be running on your localhost! --> gradle bootRun

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Generating Components, Directives, Pipes and Services

You can use the `ng generate` (or just `ng g`) command to generate Angular components:

```bash
ng generate component my-new-component
ng g component my-new-component # using the alias

# components support relative path generation
# if in the directory src/app/feature/ and you run
ng g component new-cmp
# your component will be generated in src/app/feature/new-cmp
# but if you were to run
ng g component ../newer-cmp
# your component will be generated in src/app/newer-cmp
```
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
Component | `ng g component my-new-component`
Directive | `ng g directive my-new-directive`
Pipe      | `ng g pipe my-new-pipe`
Service   | `ng g service my-new-service`
Class     | `ng g class my-new-class`
Interface | `ng g interface my-new-interface`
Enum      | `ng g enum my-new-enum`
Module    | `ng g module my-module`

# DEPLOYMENT TO FIREBASE

Before you go through the steps, make sure you refer your requests to your heroku server!
(fill in your heroku-server url in apiUrl variable in e.g. user.service)

##BUILD
1. build project for production --> `ng build --prod`
(init a build prod which is optimized for prod (fast as possible)
RESULT--> DIST folder with all compiled files)

##CONFIG  (only the first time)
1. go to firebase console website: `http://console.firebase.google.com` and **sign in** (forfree)
2. click **new project** and **create** a new project
3. go to terminal and install firebase cli --> `npm install -g firebase-tools`
4. login to firebase with : `firebase login`
5. Init the project(you have to be inside the project): **`firebase init`**
(you navigate with up and down and select options with SPACE, with Enter you go to the next STEP)
    * _1 Question_:   select **HOSTING**
    * _2 Question_:   select your **previously created** project from step 2 
    * _3 Question_:   (What file should be used for DB Rules):    **return** (we don't need that)
    * _4 Question_:   (What do you want to use as your public directory?): **type "dist"**
    * _5 Question_:   (Configure as a single-page app): **YES** (because angular  app is SinglePageApplication)
    * _6 Question_:   (File dist/index.html already exists. Overwrite?): **NO**

FINISH JUHU --> deploy with now with `firebase deploy`
6. open provided **link** ( link of this  example: https://sopratest-e6a52.firebaseapp.com/login)

-----------------------------------------------------------------------------------
##DEPLOY (up to now)
1. `ng build --prod`
2. `firebase deploy`


by sali zumberi, 2018
