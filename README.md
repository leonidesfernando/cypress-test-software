# Cypress-Test-Software

Project to explore **[Cypress.io](https://cypress.io/)** in e2e tests and some plugins such as 
[cypress-selectors](https://github.com/anton-kravchenko/cypress-selectors), 
[faker](https://github.com/faker-js/faker), etc.

All tests were built to run against a simple web application in the [teste-software](https://github.com/leonidesfernando/teste-software) repository.

## Requeriments 
- [NodeJS](https://nodejs.org/) 16.16.0+
- [Yarn](https://yarnpkg.com/getting-started) 1.22.19+
- [Cypress](https://cypress.io) 10.3.1


## Structure
As a JS project, it makes use of NodeJS and some JS frameworks. That's why we recommend using the IDE of your preference 


### After clone the repository, add/update the project and libraries, **just once**
* [NPM](https://docs.npmjs.com/): `npm install`
* [YARN](https://yarnpkg.com/getting-started): `yarn install`

### Build/Compile and Run
You can run some commands or make use of some scripts to build and run, they are in the project.

Commands:
> Build/Compile
>
>>YARN: yarn build
>
>> NPM: npm build
>
>Run
>> npx cypress run --browser=chrome --spec ./cypress/e2e/EntryTest.spec.cy.js


Scripts:
```
- Run: run.bat or run.sh

- Build/Compile & Run: buildAndRun.bat or buildAndRun.sh
```
