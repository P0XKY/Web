-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for project
CREATE DATABASE IF NOT EXISTS `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `project`;

-- Dumping structure for table project.comment
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `time` datetime NOT NULL DEFAULT current_timestamp(),
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `FK_comment_post` (`post_id`),
  KEY `FK_comment_users` (`user_id`),
  CONSTRAINT `FK_comment_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_comment_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project.comment: ~1 rows (approximately)
INSERT INTO `comment` (`comment_id`, `content`, `time`, `post_id`, `user_id`) VALUES
	(1, 'noob', '2024-02-09 00:59:20', 1, 15);

-- Dumping structure for table project.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `section` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `times` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`post_id`) USING BTREE,
  KEY `FK_post_users` (`user_id`),
  CONSTRAINT `FK_post_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project.posts: ~5 rows (approximately)
INSERT INTO `posts` (`post_id`, `user_id`, `section`, `content`, `times`) VALUES
	(1, 15, 'โต้', 'ชอบตูด', '2024-02-08 20:37:37'),
	(2, 23, 'test2', 'test2222', '2024-02-08 21:10:32'),
	(3, 15, 'test3', 'test33', '0000-00-00 00:00:00'),
	(4, 15, 'test3', 'test33', '0000-00-00 00:00:00'),
	(5, 15, 'test3', 'test33', '2024-02-09 16:26:08');

-- Dumping structure for table project.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table project.users: ~13 rows (approximately)
INSERT INTO `users` (`user_id`, `user_name`, `user_password`, `user_email`) VALUES
	(15, '1', '1234', '1@gmail.com'),
	(23, '2', '1234', '2@gmail.com'),
	(24, '3', '1234', '3@gmail.com'),
	(25, '4', '1234', '4@gmail.com'),
	(26, '6', '1234', '6@gmail.com'),
	(27, '7', '1234', '7@gmail.com'),
	(28, '5', '1234', '5@gmail.com'),
	(29, '5', '1234', '5@gmail.com'),
	(30, '5', '2134', '5@gmail.com'),
	(31, '6', '1234', '6@gmail.com'),
	(32, '7', '1234', '7@gmail.com'),
	(33, '8', '1234', '8@gmail.com'),
	(34, '9', '1234', '9@gmail.com');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
