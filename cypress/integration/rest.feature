@api @rest
Feature: Student Management Rest API

  Background:
    Given I set up a basic url as 'http://localhost:9080/studentmgmt'

  Scenario: Get a list of all students
    When I get a list of all students
    Then Response code should be 200

  Scenario: Get a list of all students in a class
    When I get a list of students by class name "abc"
    Then Response code should be 200

  Scenario: New student enrollment and search for the student record
    Given I get a list of all students
    When I add a new student record
      And I search for last created student by id
    Then Record should contain correct student info
    Then Total student count should "increase by 1"

  Scenario: Update student record and move a student to a different class
    Given I add a new student record
      And I get a list of all students
      And I get a list of students by class name "abc"
    When I update last created student record
      | studentClass | abc |
    And I search for last created student by class and id
    Then Record should contain correct student info
      And Total student count should "stay the same"
      And Student count should "increase by 1" in class "abc"

  Scenario: Delete a new student record and verify that the student record can't be found anymore
    Given I add a new student record
      And I get a list of all students
    When I delete last created student record
    Then Total student count should "decrease by 1"
      And Last created student record should not be found

  Scenario: Delete non existing student record
    When I delete a student record with id 0
    Then Response code should be 404

  Scenario: Update non existing student record
    When I update a student record
      | id           | 0   |
      | studentClass | abc |
    Then Response code should be 404

  Scenario: Search non existing student id
    When I search for student record by id 0
    Then Response code should be 404
