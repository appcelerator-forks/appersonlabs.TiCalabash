
# TiCalabash Package

[![NPM](https://nodei.co/npm/ticalabash.png)](https://nodei.co/npm/ticalabash/)

Yes. Calabash for Appcelerator Titanium (vanilla and Alloy) iOS and Android
This includes to physical devices as well as Simulators/Emulators

## Getting Started (safe answer)
Install the module with: `npm install -g ticalabash`

Enter the password you normally enter for `sudo` when requested.
Use sudo before npm install if you get an `Error: EACCES` message.

## Controversial but correct answer
Appcelerator installs npm in such a way that it requires on a Mac or Linux that you use sudo.
This is technically wrong when viewed by from the Node.js perspective.
The following explanation is how to fix this issue. 

**No Warranty is provided for this solution.**
Don't use `sudo npm install` yourself, because it is bad practice and will break the installation process. It's better to correctly set the permissions on the `/usr/local` directory instead, so you don't have to ever use `sudo` again when installing npm packages.

```
sudo chown -R $USER /usr/local
```
This solution presumes you are a single user on the machine.

## Example
To test TiCalabash, create a default Alloy application and run:
`ti calabash --platform=[android,ios]`

* On iOS: Just press enter when asked which target to duplicate.
* On Android: Make sure your emulator (hint: Use [Genymotion](http://www.genymotion.com)) should already be running.

After lots of compiling, you should see:
```
Feature: Home Screen
  As an App Developer
  I want to see an example feature work on a default alloy app
  So that I can start using TiCalabash quickly

  Scenario: See Home Screen                          # features/home_screen.feature:6
    Given I am on the Home Screen                    # features/step_definitions/ticalabash_custom_steps.rb:1
    Then I should see text containing "Hello, World" # calabash-cucumber-0.11.3/features/step_definitions/calabash_steps.rb:384
    And take picture                                 # calabash-cucumber-0.11.3/features/step_definitions/calabash_steps.rb:229

1 scenario (1 passed)
3 steps (3 passed)
```

The picture/screenshot is named `screenshot_X.png` and can be found in:
* On iOS: the `build/iphone` folder.
* On Android: the project root folder.

## Documentation
Because TiCalabash is wrapping [Calabash](http://calaba.sh), please use Calabash's documentation to learn how to use Calabash together with [Cucumber](http://cukes.info):
* [Calabash iOS documentation](https://github.com/calabash/calabash-ios/wiki/00-Calabash-iOS-documentation)
* [Calabash Android documentation](https://github.com/calabash/calabash-android/blob/master/README.md)

(The iOS documentation is far superior to the Android documentation and is mostly valid for Android as well). 

If you don't have a features directory at the project root level, it will be created.
The `ti calabash` command will rebuild your Android or iOS app every time.

**Querying your UI**
* On [iOS](https://github.com/calabash/calabash-ios/wiki/05-Query-syntax)
* On [Android](http://blog.lesspainful.com/2012/12/18/Android-Query/ )
 
**Recording Touches**

Recording of touches is currently not supported, for two reasons:
* It does not work anymore with Calabash iOS on iOS 7+ 
* Has never been implemented in Calabash Android



## Presentation
The following slide deck may be of use: [TiCalabash: Fully automated Acceptance Testing @ TiConf EU 2014](http://www.slideshare.net/sophrinix/ticalabash-fully-automated-testing-ticonf-eu-2014)

## Jenkins configuration
If you want to integrate TiCalabash in Jenkins, use the following configuration:
```
cd ~/Desktop/ticonf2014testappdemo/alloytest # or actually pull from git. 
titanium clean titanium build --platform=iphone --test & 
sleep 30 
killall "iPhone Simulator" 

export PATH=“/Users/andrewmcelroy/.rbenv/shims:/Users/andrewmcelroy/bin:/usr/local/bin: /Users/andrewmcelroy/.rbenv/bin:/Users/andrewmcelroy/android/tools:/Users/andrewmcelroy/android/: /Users/andrewmcelroy/android//tools:/Users/andrewmcelroy/android/platform-tools/:/usr/bin:/bin: /usr/sbin:/sbin:/usr/local/bin:/usr/local/git/bin:" 

echo | titanium calabash —platform=iphone
cd ~/Library/Application Support/iPhone Simulator/7.1/Applications/ 
AppGUID = $(ﬁnd . -name "alloytest" | cut -d "/" -f 2) 

cp "~/Library/Application Support/iPhone Simulator/7.1/Applications/$AppGUID/Documents/jenkins.xml" $WORKSPACE/jenkins.xml
```

Make sure you replace the folders with the actual folders on your system.

## Strider configuration
soon.
A strider module that seamlessly integrates with TiCalabash is coming whenever Andrew can finish the module. 

## Training
Training by Codex Labs for TiCalabash is in the planning stage.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## Release History
1.1.2 - Updated calabash-android to 0.5.5 and calabash-cucumber to 0.12.2 ( iOS 8 compatibility)
1.0.4 - Added Sample features

1.0.0 - TiCalabash wraps calabash


## License
License: MIT (c) 2014
Matt Apperson / Apperson Labs
Andrew McElroy / Codex Labs, LLC
