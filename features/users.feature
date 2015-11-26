Feature: Login in
  In order to manage system
  A admin
  Should login to the page

Scenario: valid user and password
  Given I am on login page
  When try to login as username "123456@qq.com" and password "123456"
  Then I should see "注销" on the page