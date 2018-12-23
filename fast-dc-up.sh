GREEN='\033[0;32m'
NC='\033[0m'
PRODUCTION='production'
printf "${GREEN}Installing website dependencies${NC}\n"
cd app
if test -d node_modules; 
then
  printf "${GREEN}website node_modules exists, skipping npm install${NC}\n"
else 
  npm install
fi && 

printf "${GREEN}transpiling website${NC}\n"

if [ "$1" = "production" ]; then
  npm run buildProd
else
  npm run buildDev
fi &&
#npm run clean-server
#npm run build-server
# Dont build webpack
cd ../

echo " ___________________________________________"
echo "< Welcome to AMICS ART ROMANIC DE SABADELL >"
echo " -------------------------------------------"
echo "        \   ^__^"
echo "         \  (oo)\_______"
echo "            (__)\       )\/\\"
echo "                ||----w |"
echo "                ||     ||"

docker-compose up
