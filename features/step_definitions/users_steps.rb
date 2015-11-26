Given(/^I am on login page$/) do
  visit '/signin'
end

When(/^try to login as username "([^"]*)" and password "([^"]*)"$/) do |username, password|
  fill_in('username', :with => username)
  fill_in('password', :with => password)
  click_button('submit')
end

Then(/^I should see "([^"]*)" on the page$/) do |text|
  expect(page.find('#logout').text).to eq(text)
end