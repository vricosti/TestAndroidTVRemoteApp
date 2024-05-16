# Getting Started

This project tries to port **androidtv-remote** to react-native.  
First steps includes to remove all specific node dependencies and use **react-native-modpow**.  
So instead of using the standard **androidtv-remote**, there is my patched version inside the packages folder.  


Now the problem is to replace the tls node module, so we have two options:  
- react-native-tls (not maintained anymore and I had to fix the android build)  
- react-native-tcp-socket (normally is the right approach but I have ssl errors for now)  




