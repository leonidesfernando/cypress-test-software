# Cypress-Test-Software

Project to explore **[Cypress.io](https://cypress.io/)** in e2e tests and some plugins such as 
[cypress-selectors](https://github.com/anton-kravchenko/cypress-selectors), 
[cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
[faker](https://github.com/faker-js/faker), etc.

All tests were built to run against a simple web application in the [teste-software](https://github.com/leonidesfernando/teste-software) repository.

## Requeriments 
- [NodeJS](https://nodejs.org/) 18.13.0
- [Yarn](https://yarnpkg.com/getting-started) 1.22.19+
- NPM 8.19.3+
- [Cypress](https://cypress.io) 12.15.0


## Structure
As a JS/TS project, it makes use of NodeJS _npm_ and or _yarn_ and some other JS frameworks. That's why we recommend using the IDE of your preference. 


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
> As we have spec to run the normal way, only smoke tests, all in parallel mode or _Cucumber's_ features. For each case, we'll need some paramters to run.
>
> - If you desire open the Cypress and choose the project and each spec to run:
>   - `cypress --config-file config/cypress.config.js`
>
> - If you want to run in parallel mode:
>   - `npm run test:parallel`
>
> - If you desire to run all specs without _Cucumber_:
>   - `npm run test`
>
> - if you want to run with _Cucumber_:
>   - `npm run test:cucumber`
>
> - if you want to run the smoke tests(all tests with `{tags: '@smoke'}`):
>   - `npm run test:smoke`
>
>## Report:
>However, you generate html report of executions.
>
>For the common spec, you just need to use this script:
>   - `npm run test:report`
>
>And for the cubumber features, you can use this one:
>   - `npm run test:cucumber:report`