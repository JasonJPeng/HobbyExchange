-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: hobbies_ex_db
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hobbies`
--

DROP TABLE IF EXISTS `hobbies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `hobbies` (
  `hobby_id` int(11) NOT NULL AUTO_INCREMENT,
  `hobby_name` varchar(50) NOT NULL,
  PRIMARY KEY (`hobby_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hobbies`
--

LOCK TABLES `hobbies` WRITE;
/*!40000 ALTER TABLE `hobbies` DISABLE KEYS */;
INSERT INTO `hobbies` VALUES (1,'swimming'),(2,'dancing'),(3,'painting'),(4,'cooking'),(5,'singing'),(6,'gardening');
/*!40000 ALTER TABLE `hobbies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `i_can_teach`
--

DROP TABLE IF EXISTS `i_can_teach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `i_can_teach` (
  `teach_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `description` text,
  PRIMARY KEY (`teach_id`),
  UNIQUE KEY `user_id` (`user_id`,`hobby_id`),
  KEY `hobby_id` (`hobby_id`),
  CONSTRAINT `i_can_teach_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `i_can_teach_ibfk_2` FOREIGN KEY (`hobby_id`) REFERENCES `hobbies` (`hobby_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `i_can_teach`
--

LOCK TABLES `i_can_teach` WRITE;
/*!40000 ALTER TABLE `i_can_teach` DISABLE KEYS */;
INSERT INTO `i_can_teach` VALUES (1,1,1,'I am an xpert'),(2,1,4,'I am a good cook'),(3,2,3,'I am a painter'),(4,2,6,'I am a gardener'),(5,3,2,'I dance everyday'),(6,3,5,'I sing all the time');
/*!40000 ALTER TABLE `i_can_teach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `i_want_to_learn`
--

DROP TABLE IF EXISTS `i_want_to_learn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `i_want_to_learn` (
  `learn_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `hobby_id` int(11) NOT NULL,
  `description` text,
  PRIMARY KEY (`learn_id`),
  UNIQUE KEY `user_id` (`user_id`,`hobby_id`),
  KEY `hobby_id` (`hobby_id`),
  CONSTRAINT `i_want_to_learn_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `i_want_to_learn_ibfk_2` FOREIGN KEY (`hobby_id`) REFERENCES `hobbies` (`hobby_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `i_want_to_learn`
--

LOCK TABLES `i_want_to_learn` WRITE;
/*!40000 ALTER TABLE `i_want_to_learn` DISABLE KEYS */;
INSERT INTO `i_want_to_learn` VALUES (1,1,3,'How to paint ?'),(2,2,2,'How to dance ?'),(3,3,1,'How to swim ?'),(4,3,4,'How to cook ?');
/*!40000 ALTER TABLE `i_want_to_learn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `photoUrl` varchar(100) DEFAULT NULL,
  `aboutMe` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jason','jason.j.peng@gmail.com',NULL,'I am Jason'),(2,'Mark','mark@gmail.com',NULL,'I am Mark'),(3,'Tansu','tansu@gmail.com',NULL,'I am tansu');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-29 12:17:53
