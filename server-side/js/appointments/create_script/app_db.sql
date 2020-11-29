CREATE DATABASE IF NOT EXISTS `appointment`;
USE `appointment`;

CREATE TABLE IF NOT EXISTS `milestones`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
	`project` varchar(255),
	`task` varchar (255),
	`deadline` date,
    `notes` varchar(255),
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;