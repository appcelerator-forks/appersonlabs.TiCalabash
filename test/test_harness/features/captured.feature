Feature: Captured Fugitives
  As a bounty hunter
  I want to quickly deal with captured fugitives
  So that I can <classified> <classified> <classified> with  <classified> and <classified> but not <classified> 

Scenario: See who is captured
	Given I am on the Home Screen
	And I touch "Blain Hamon"
	And I touch "Capture"
	When I touch "Captured"
	Then I should see text containing "Blain Hamon"
	And take picture

Scenario: Get Captured Fugitive's Menu
	Given I am on the Home Screen
	When I touch "Captured"
	And I touch "Blain Hamon"
	And take picture
	
Scenario: View Captured Fugitive on a Map
	Given I am on the Home Screen
	When I touch "Captured"
	And I touch "Blain Hamon"
	Then I should see a map
	Then I should see the user location
	And take picture
	

Scenario: Delete a Captured Fugitive
	Given I am on the Home Screen
	When I touch "Captured"  
	And I touch "Blain Hamon"
	And I touch "Delete"
	Then I should not see "Blain Hamon"
	And take picture
