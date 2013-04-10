Andriod Help:

Emulator:
http://stackoverflow.com/questions/3480201/how-do-you-install-an-apk-file-in-the-android-emulator              
http://mobile.tutsplus.com/tutorials/android/common-android-virtual-device-configurations/

Signing App:
http://developer.android.com/tools/publishing/app-signing.html 
$ keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
            
For Logging:
./adb logcat