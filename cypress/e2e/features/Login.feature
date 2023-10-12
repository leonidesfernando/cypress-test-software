Feature: Validate login scnenarios
  Scenarios to check:
  1. valid credentials, login and password
  2. invalid login and valid passoword
  3. valid login and invalid passowrd
  4. invalid logn and invalid passoword

Scenario: Login in the system with table
    Given The follow credentials then
      | User         | Password         |
      | @ValidUser   | @ValidPassword   |
      | @InvalidUser | @ValidPassword   |
      | @ValidUser   | @InvalidPassword |
      | @InvalidUser | @InvalidPassword |



Scenario Outline: Now login in the system with scenario outline
    Given The follow credentials '<User>' and '<Password>'

    Examples:
      | User         | Password         |
      | @ValidUser   | @ValidPassword   |
      | @InvalidUser | @ValidPassword   |
      | @ValidUser   | @InvalidPassword |
      | @InvalidUser | @InvalidPassword |
