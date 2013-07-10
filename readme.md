Andriod Help:

Emulator:
http://stackoverflow.com/questions/3480201/how-do-you-install-an-apk-file-in-the-android-emulator              
http://mobile.tutsplus.com/tutorials/android/common-android-virtual-device-configurations/

Signing App:
http://developer.android.com/tools/publishing/app-signing.html 
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

Add .apk to emulator:
       
For Logging:
./adb logcat 

iPhone Help:

PhoneGap Local:
/Users/callumrimmer/Library/phonegap-2.5.0/DartsScorer

PhoneGap build and emulate:
/Users/callumrimmer/Library/phonegap-2.5.0/DartsScorer/cordova/build 
/Users/callumrimmer/Library/phonegap-2.5.0/DartsScorer/cordova/emulate

Getting Developer (and Distribution) Certificates:   

https://developer.apple.com/account
+ Create App Id
+ Create Certificate
+ Create Provising Profile

Then
https://build.phonegap.com/docs/ios-builds

