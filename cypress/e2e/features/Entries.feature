Feature: Validate CRUD of entries of incomes and expenses
  Scenarios to check:
  1. login to the system
  2. create a new entry for income(RENDA) and other entry for expense(DESPESA)
  3. find an entry
  4. edit the entry found
  5. remove the entry


  Scenario: Login to the system with the pre-defined user by configurations
    Given an user with correct credentials from the configurations
    Then Have to login and access the home page
    Then Do logout
     