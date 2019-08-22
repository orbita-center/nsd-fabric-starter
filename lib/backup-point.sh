#!/usr/bin/env bash
source ../lib.sh
usageMsg="$0 backupLabel"
exampleMsg="$0 1"

backupLabel=${1:?`printUsage "$usageMsg" "$exampleMsg"`}

cd ..

backupDir="$PWD/backup/$backupLabel"

sudo rm -r -f "$backupDir"
mkdir -p "$backupDir"

echo; printInColor "1;32" "Stopping containers"
docker stop $(docker ps -aq)

echo; printInColor "1;32" "Backuping files"
docker run --rm -v /var/lib/docker:/docker -v ${backupDir}:/backup olegabu/fabric-tools-extended bash -c "cp -r -a /docker/volumes /backup"
sudo cp -r -a crypto-config ${backupDir}

echo; printInColor "1;32" "Starting containers up"
docker start $(docker ps -aq)






