pwd
cd ..
touch ./utils/url.js
if [ $1 = "dev" ] 
then
    cp ./urls/dev.js ./utils/url.js
fi
if [ $1 = "pro" ] 
then
    cp ./urls/pro.js ./utils/url.js
fi