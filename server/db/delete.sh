#!/bin/bash

# Change `bash` to other shell if needed
bash ./backup.sh

echo "DELETING database !!!"
echo "Enter your MySQL username:"
read username
mysql -u $username -p < ./queries/delete.sql