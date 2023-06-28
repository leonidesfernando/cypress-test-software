Feature: Validate CRUD of entries of incomes and expenses
  Scenarios to check:
  1. login to the system
  2. create a new entry for income(RENDA) and other entry for expense(DESPESA)
  3. find an entry
  4. edit the entry found
  5. remove the entry


  Scenario: Login to the system with the pre-defined user by configurations
    Given an user with correct credentials from the configurations
    When I input a valid credentials I must log in the system
    Then Do logout
    

  Scenario: Create a new entry, find and edit, find and remove
    When I input a valid credentials I must log in the system
    When I click on new button I must go to the register page
    And I generate dynamic data and save a new entry
    And After register we must find out the entry just added or edited
    And With the entry found I click on the button to edit it
    And After register we must find out the entry just added or edited
    Then I should be able to remove the newly found entry
    Then Do logout