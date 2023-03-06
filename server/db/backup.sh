#!/bin/bash

echo "Backing up database"
mkdir backup
echo "Enter your MySQL username:"
read username
mysqldump -u $username -p girudo > ./backup/girudo_dump_$(date +"%Y-%m-%d_%H-%M-%S").sql