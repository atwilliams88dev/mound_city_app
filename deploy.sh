# MOVE DATA TO BACKUP DIRECTORY
cp -r /root/app/mound_city_starter/pgdata /root/app/backup
# STASH CURRENT CHANGES
git stash save --keep-index --include-untracked
# BRING DOWN CHANGES FROM VERSION CONTROL
git pull origin main
# RESTORE DATA FROM BACKUP
cp -r /root/app/backup /root/app/mound_city_starter/pgdata 
# BUILD APP
npm run build
