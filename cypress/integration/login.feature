Feature: Login functionality

  Scenario: Valid user login
    Given I have opened the login page
    When I login with username "tomsmith" and password "SuperSecretPassword!"
    Then I should be on secure area page
    When I login out
    Then I should be on login page

  Scenario Outline: Invalid sign in with username "<Username>" and password "<Password>"
    Given I have opened the login page
    When I login with username "<Username>" and password "<Password>"
    Then I should see error message "<Error>"
    Examples:
      | Username | Password             | Error                     |
      |          |                      | Your username is invalid! |
      | baduser  | badpassword          | Your username is invalid! |
      | tomsmith |                      | Your password is invalid! |
      | tomsmith | badpassword          | Your password is invalid! |
      | TOMSMITH | SuperSecretPassword! | Your username is invalid! |
      | tomsmith | supersecretpassword! | Your password is invalid! |


  Scenario: Attempt to navigate to athenticated page without login
    When I nagivate to secure page directly
    Then I should see error message " You must login to view the secure area!"
      And I should be on login page

  Scenario: Logout from login and then attempt navigate to athenticated page without login
    Given I have opened the login page
      And I login with username "tomsmith" and password "SuperSecretPassword!"
      And I login out
    When I nagivate to secure page directly
    Then I should see error message " You must login to view the secure area!"
      And I should be on login page

Scenario: sql injestion
    Given I have opened the login page
    When I login with username "tomsmith" and password "'12345' OR '1' = '1'"
    Then I should see error message "Your password is invalid!"
