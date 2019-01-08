pwd
touch ./net/env.js
if [ $1 = "dev" ] 
then
    cp ./env/dev.js ./net/env.js
fi
if [ $1 = "pro" ] 
then
    cp ./env/pro.js ./net/env.js
fi
if [ $1 = "pre-release" ] 
then
    cp ./env/pre-release.js ./net/env.js
fi