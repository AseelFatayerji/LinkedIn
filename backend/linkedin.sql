-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Mar 25, 2024 at 10:22 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `linkedin`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE IF NOT EXISTS `companies` (
  `company_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_email` varchar(200) DEFAULT NULL,
  `company_name` varchar(200) DEFAULT NULL,
  `company_password` varchar(200) NOT NULL,
  PRIMARY KEY (`company_id`),
  UNIQUE KEY `company_email` (`company_email`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`company_id`, `company_email`, `company_name`, `company_password`) VALUES
(2, 'company1@gmail.com', 'company1', '1234'),
(3, 'company2@gmail.com', 'company2', '1234'),
(4, 'company3@gmail.com', 'company3', '1234'),
(5, 'company4@gmail.com', 'company4', '1234');

-- --------------------------------------------------------

--
-- Table structure for table `company_posts`
--

DROP TABLE IF EXISTS `company_posts`;
CREATE TABLE IF NOT EXISTS `company_posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `post_info` text,
  `post_img` text,
  PRIMARY KEY (`post_id`),
  KEY `company_id` (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `company_posts`
--

INSERT INTO `company_posts` (`post_id`, `company_id`, `post_info`, `post_img`) VALUES
(1, 2, 'companypost', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
CREATE TABLE IF NOT EXISTS `followers` (
  `follower_id` int(11) NOT NULL AUTO_INCREMENT,
  `following_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`follower_id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`follower_id`, `following_id`, `user_id`) VALUES
(1, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `job_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) NOT NULL,
  `position` varchar(200) DEFAULT NULL,
  `requirements` text,
  `salary` int(11) DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `company_id` (`company_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`job_id`, `company_id`, `position`, `requirements`, `salary`) VALUES
(1, 2, 'senior dev', 'fullstack web dev', 200);

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

DROP TABLE IF EXISTS `job_applications`;
CREATE TABLE IF NOT EXISTS `job_applications` (
  `app_id` int(11) NOT NULL AUTO_INCREMENT,
  `job_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`app_id`),
  KEY `user_id` (`user_id`),
  KEY `job_id` (`job_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`app_id`, `job_id`, `user_id`, `status`) VALUES
(2, 1, 1, b'1');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(200) DEFAULT NULL,
  `user_name` varchar(200) DEFAULT NULL,
  `user_lastname` varchar(200) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `user_password` varchar(200) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_email`, `user_name`, `user_lastname`, `address`, `user_password`) VALUES
(1, 'testuser@gmail.com', 'testuser1', 'testlastname', '', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `user_educations`
--

DROP TABLE IF EXISTS `user_educations`;
CREATE TABLE IF NOT EXISTS `user_educations` (
  `eductaion_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `institution_name` varchar(200) DEFAULT NULL,
  `degree` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`eductaion_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_posts`
--

DROP TABLE IF EXISTS `user_posts`;
CREATE TABLE IF NOT EXISTS `user_posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_info` text,
  `post_img` text,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_posts`
--

INSERT INTO `user_posts` (`post_id`, `user_id`, `post_info`, `post_img`) VALUES
(9, 1, 'testpost2', 'postimg'),
(8, 1, 'testpost', 'testimg'),
(10, 1, 'post3', 'img3'),
(11, 1, 'post4', 'img4'),
(12, 1, 'post5', 'img5');

-- --------------------------------------------------------

--
-- Table structure for table `user_skills`
--

DROP TABLE IF EXISTS `user_skills`;
CREATE TABLE IF NOT EXISTS `user_skills` (
  `skill_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `skill_name` varchar(200) DEFAULT NULL,
  `skill_level` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`skill_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
