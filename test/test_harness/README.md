Cucumber Testing for Titanium (testing alloy fugitive)
======================================================

## IMPORTANT: THIS IS FOR ALLOY ONLY. If you need Titanium classic Cucumber testing then please help me or wait until the node package is out.
## THESE BASH FILES WILL ERASE YOUR Resources DIRECTORY!!!!!!!!!
## THIS IS FINE FOR ALLOY, BUT CLEARLY NOT A GOOD IDEA FOR TITANIUM CLASSIC.

## see the bottom note on why alloy only at the bottom for more info


It is actually here. 

## Background


This is a fork of Aaron Saunders alloy_fugitive, which is in turn an Alloy port of TiBounty Hunter

Regardless, What makes this version special is that I have wrapped Calabash-ios with two bash scripts to bring you Cucumber testing with Alloy.


## Setup


Calabash-ios depends on ruby.
That said you will need to run these commands:

`gem install calabash --no-ri --no-rdoc`

Next you will want to run

`./run.sh`

When you are asked what scheme you want to copy, just press enter

next run

`./ticucumber.sh`

Watch in amazement as it just works.

One minor note: I checked in a .ruby-version file set to 1.9.3-p448 because calabash doesn't work 100% right with ruby 2.0.
Also if you only have ruby 1.8 then seriously, upgrade. In fact, I am not even sure **HOW** you even have such an outdated version of ruby.
Deleting .ruby-version shouldn't be a problem. That said, my claim is that this test harness works with that version of ruby.


## two failing steps

Yes I am aware that the two steps that reference map fail. I did that intentionally. I am writing the blog post up. the next push will fix it.


## Why is this Alloy only right now?

It is alloy only because I am deleting the Resources directory every time the specs run.

## Why are you deleting the Resources directory every time the specs run?

Because sometimes when you compile an Alloy written program through Xcode, app.js is not found
This is a very brute force way of making things work consistently. Please be patient with us.

We'd rather be overkill and consistently work than less forceful and not consistently work. 

## Author(s)

Actual app:
**Aaron K. Saunders**  
web: blog.clearlyinnovative.com
email: aaron@clearlyinnovative.com 
twitter: @aaronksaunders  

Cucumber Integration, specs, bash scripts:
**Andrew McElroy**
web: blog.codexlabs.com
email: amcelroy@codexlabs.com
twitter: @codexlabs

## License

    Copyright (c) 2012-2013 Aaron K. Saunders
		Copyright (c) 2013 Andrew McElroy

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
