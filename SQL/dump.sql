-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: mynetwork2
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_post` int(10) unsigned NOT NULL,
  `id_user` int(11) unsigned NOT NULL,
  `text` varchar(150) NOT NULL,
  `profil_prenom` varchar(50) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`id_user`),
  KEY `id_post` (`id_post`),
  KEY `id_post_2` (`id_post`),
  KEY `id_post_3` (`id_post`),
  KEY `id_post_4` (`id_post`),
  KEY `comment_id` (`comment_id`),
  KEY `id_post_5` (`id_post`),
  KEY `id_post_6` (`id_post`),
  KEY `id_post_7` (`id_post`),
  KEY `profil_prenom` (`profil_prenom`),
  KEY `profil_prenom_2` (`profil_prenom`),
  KEY `id_post_8` (`id_post`),
  KEY `comment_id_2` (`comment_id`),
  KEY `id_user` (`id_user`),
  KEY `profil_prenom_3` (`profil_prenom`),
  KEY `profil_prenom_4` (`profil_prenom`),
  KEY `id_user_2` (`id_user`),
  KEY `id_user_3` (`id_user`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`id_post`) REFERENCES `post` (`id_post`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likers`
--

DROP TABLE IF EXISTS `likers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likers` (
  `id_likes` int(11) NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `likes` varchar(11) DEFAULT '1',
  PRIMARY KEY (`id_likes`)
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likers`
--

LOCK TABLES `likers` WRITE;
/*!40000 ALTER TABLE `likers` DISABLE KEYS */;
/*!40000 ALTER TABLE `likers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id_post` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_user` int(11) unsigned NOT NULL,
  `profil_prenom` varchar(50) NOT NULL,
  `message` varchar(250) NOT NULL,
  `picture` varchar(200) NOT NULL,
  `urgent` int(11) DEFAULT 0,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_post`),
  KEY `id_post` (`id_post`),
  KEY `id_user` (`id_user`),
  KEY `id_post_3` (`id_post`),
  KEY `id_post_4` (`id_post`),
  KEY `id_post_5` (`id_post`),
  KEY `profil_prenom` (`profil_prenom`),
  KEY `profil_prenom_2` (`profil_prenom`),
  KEY `id_user_2` (`id_user`),
  KEY `id_post_2` (`id_post`),
  KEY `profil_prenom_3` (`profil_prenom`),
  KEY `id_user_3` (`id_user`),
  KEY `message` (`message`),
  KEY `id_user_4` (`id_user`),
  KEY `message_2` (`message`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=751 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (610,43,'','Les nouveaux bureaux de Groupomania !!!','http://localhost:5000/images/building.jpg1651509331085.jpg',0,'2022-05-02 16:35:31'),(634,49,'','Quelqu\'un a l\'adresse des futures bureaux ?','',1,'2022-05-09 15:24:36'),(635,49,'','Salut tout le monde, je partage une photo des nouveaux bureaux ! Bonne journée !','http://localhost:5000/images/bureau_groupomania.jpg1652111213793.jpg',0,'2022-05-09 15:46:53');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `profil_nom` varchar(50) NOT NULL,
  `profil_prenom` varchar(50) NOT NULL,
  `id_user` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `password` varchar(150) NOT NULL,
  `photo` varchar(250) NOT NULL DEFAULT 'http://localhost:5000/images/profil_none.jpg1652195915496.jpg',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAdmin` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_user`,`timestamp`),
  UNIQUE KEY `email` (`email`),
  KEY `profil_nom` (`profil_nom`),
  KEY `profil_prenom` (`profil_prenom`),
  KEY `profil_prenom_2` (`profil_prenom`),
  KEY `id_user` (`id_user`),
  KEY `profil_prenom_3` (`profil_prenom`),
  KEY `id_user_2` (`id_user`),
  KEY `id_user_3` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('','Administrateur',1,'admin@gmail.com','$2b$10$LfMtuLhZt2HIqYHraka0V.Me98GgKToreI59Vx27tVOZLwGYtjV/e','http://localhost:5000/images/icône-d-administration-131187535.jpg1652169390313.jpg','2022-05-10 07:49:36',1),('Quirin','Nicolas',43,'nicolas@gmail.com','$2b$10$D801n9JvUgBT6TAuClqfRefjMQ1WmHfrdHJn94XnSWybe3ltLequK','http://localhost:5000/images/selle.jpg1653116389033.jpg','2022-04-18 15:11:16',0),('Vidal','Kevin',49,'kevinvidal@gmail.com','$2b$10$Ll8y5tAzUixaVQIZQjlNQOgK6M0fkq1FhfF3jn/6.6SvJ07qs2RwO','http://localhost:5000/images/fond1.jpg1652108790267.jpg','2022-05-09 15:04:54',NULL),('Delavilla','Alissa',50,'alissadelavilla@gmail.com','$2b$10$S54AWL.Plk1s/LjHlIGNh.B6QVNy.ovXJWranM9RW1kzXYGAPTeEG','http://localhost:5000/images/iconUser.ico.png1652110370552.png','2022-05-09 15:31:20',NULL),('Nik','Olas',198,'nicolas@gmail.fr','$2b$10$3XnxYXoGhnbnTEzdWKGpferTkcsw6SNDlneu5SInIp1/mHgTf.JzO','http://localhost:5000/images/profil_none.jpg1652195915496.jpg','2022-05-21 18:07:25',NULL);
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

-- Dump completed on 2022-05-24 12:46:57
