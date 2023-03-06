CREATE DATABASE IF NOT EXISTS `girudo`;
USE `girudo`;
CREATE TABLE IF NOT EXISTS `Users` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(45) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `cover_picture` VARCHAR(100) NULL,
    `profile_picture` VARCHAR(100) NULL,
    `city` VARCHAR(45) NULL,
    `website` VARCHAR(45) NULL,
    PRIMARY KEY (`id`),
    /*
     A `visible` index is one that is used by the query optimizer to speed up 
     queries that involve the `id` column.
     */
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE
);
CREATE TABLE IF NOT EXISTS `Posts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(200) NULL,
    `media` VARCHAR(200) NULL,
    `user_id` INT NOT NULL,
    /* `date_created = NULL` is temporary for testing, should be `NOT NULL`*/
    `date_created` DATETIME NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    /*
     `ON UPDATE CASCADE` and `ON DELETE CASCADE` options to the foreign key 
     definition, indicating that when a user is updated or deleted in the 
     `users` table, the corresponding rows in the `posts` table should also be 
     updated or deleted automatically.
     
     Note: This will only work if the `id` column in the `users` table is set as 
     a primary key. If the `id` column is not a primary key, we will need to add 
     the `CASCADE` option to the foreign key constraint in the `users` table.
     */
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `Comments` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(200) NOT NULL,
    `date_created` DATETIME NULL,
    `user_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `Stories` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `media` VARCHAR(200) NOT NULL,
    `user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `Relationships` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `follower_user_id` INT NOT NULL,
    `followed_user_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    FOREIGN KEY (`follower_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`followed_user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `Likes` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `post_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);