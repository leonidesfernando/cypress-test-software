rem yarn build & npx cypress run --browser=chrome  --spec ./cypress/e2e/**/*


yarn build & npx cypress-parallel -s cy:run -t 2 -d ./cypress/e2e/**/* -a \"--browser=chrome\"