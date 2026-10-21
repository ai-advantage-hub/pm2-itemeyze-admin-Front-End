# Pm2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.8.

## Environment setup

The environment files are not included in this repository. They are shared separately by email. Add them before you run or build the project:

1. Get the environment files from the email:
   - `environment.ts`, used for local development (`ng serve`)
   - `environment.prod.ts`, used for production builds (`ng build --configuration production`)
2. Create an `environments` folder inside `src` if it doesn't already exist.
3. Copy both files into that folder. The structure should look like this:

   ```
   src/
   └── environments/
       ├── environment.ts
       └── environment.prod.ts
   ```

4. Keep the file names exactly as shown. Angular uses these names to find the files, and `angular.json` swaps in `environment.prod.ts` for production builds.
5. Don't commit these files. They may contain API URLs and keys, and `src/environments` is already listed in `.gitignore`.

If either file is missing, the build will fail with an error like `Cannot find module '../environments/environment'`.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## versions 
Node:14.21.3,
cli-10.2.7
