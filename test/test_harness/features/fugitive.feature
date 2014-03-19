Feature: Deal with Fugitives
	As a bounty hunter
	I want to maintain a list of fugitives
	So that I can help promote national security 

Scenario: Add a Fugitive
	Given I am on the Home Screen
	When I touch "Add"
	And I touch the "Fugitive Name" input field
	And I enter "Aslak Hellesoy" into input field number 1
	And I touch the "Save" button
	Then I should see text containing "Aslak Hellesoy"
	And take picture

Scenario: Select a Fugitive
	Given I am on the Home Screen
	When I touch "Jeff Haynie"
	And take picture


Scenario: Capture a Fugitive
	Given I am on the Home Screen
	When I touch "Jeff Haynie"
	And I touch "Capture"
	And I touch "Captured" 
	Then I should see "Jeff Haynie"
	And take picture

Scenario: Delete a Fugitive
	Given I am on the Home Screen
	When I touch "Nolan Wright"
	And I touch "Delete"
	Then I should not see "Nolan Wright"
	And take picture

