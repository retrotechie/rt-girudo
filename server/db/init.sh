#!/bin/bash

# Grant permission to .sh files
chmod +x *.sh

echo "Creating database"
echo "Enter your MySQL username:"
read username

mysql -u $username -p < ./queries/init.sql