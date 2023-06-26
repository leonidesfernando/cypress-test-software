# Cypress-Test-Software

Project to explore **[Cypress.io](https://cypress.io/)** in e2e tests and some plugins such as 
[cypress-selectors](https://github.com/anton-kravchenko/cypress-selectors), 
[cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
[faker](https://github.com/faker-js/faker), etc.

All tests were built to run against a simple web application in the [teste-software](https://github.com/leonidesfernando/teste-software) repository.

## Requeriments 
- [NodeJS](https://nodejs.org/) 16.16.0+
- [Yarn](https://yarnpkg.com/getting-started) 1.22.19+
- [Cypress](https://cypress.io) 12.15.0


## Structure
As a JS/TS project, it makes use of NodeJS and some JS frameworks. That's why we recommend using the IDE of your preference 


### After clone the repository, add/update the project and libraries, **just once**
* [NPM](https://docs.npmjs.com/): `npm install`
* [YARN](https://yarnpkg.com/getting-started): `yarn install`

### Build/Compile and Run
You can run some commands or make use of some scripts to build and run, they are in the project.

# Commands:
> ## Build/Compile
>
>>YARN: yarn build
>
>> NPM: npm build
>
>## Run
>
> As we have spec with and without _Cucumber_ we'll need some paramters to run.
>
> - If you desire open the Cypress and choose the project and each spec to run:
>   - `cypress --config-file config/cypress.config.js`
>
>
> - If you desire to run all specs without _Cucumber_:
>   - `npx cypress run --browser=chrome --headed --config-file config/cypress.config.js`


## Scripts:
However, you can use these scripts to make your life more comfortable

- Run: `run.bat` or `run.sh`

- Build/Compile & Run: 
    - `buildAndRun.bat` or 
    - `buildAndRun.sh` or
    - `buildAndRunParalle.bat` or
    - buildAndRunCucumber.bat or
    
