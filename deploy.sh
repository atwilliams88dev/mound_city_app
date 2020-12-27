
# STASH CURRENT CHANGES
git stash save --keep-index --include-untracked
# BRING DOWN CHANGES FROM VERSION CONTROL
git pull origin main
#Bring down Apps
docker stop mound_city_express_app
# BUILD APP BUT DONT CHANGE DB OR DB ADMIN
npm run build
# Remove unused docker items
docker system prune