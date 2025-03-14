-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2025 at 05:56 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dpuff_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `size` varchar(10) NOT NULL,
  `price` int(5) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `gambar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `name`, `size`, `price`, `description`, `gambar`) VALUES
(1, 'Puffy Burger Plushie', '30cm x 30c', 20, 'Assamble your puffy plushies burger to your liking! You dont want the lettuce take it out and make it as your blanket!', 'https://i.imgur.com/kWiE1An.png'),
(2, 'Dreamy Soft Plushies', '60cm x 40c', 23, 'Now you can have a cute and soft companion with you when you sleep! Because dreamy plushies to the rescue!', 'https://i.imgur.com/0n0E6ke.png'),
(3, 'Puffy Plushie Keychain', '8cm x 6cm', 6, 'Scared to do a solo travel or want a companion with you when you go out? Puffy is there for you now! You can take him with you with the compactible size to be your keychain companion!', 'https://i.imgur.com/nFmWocf.png'),
(4, 'Accessories', '5cm x 3cm', 2, 'Bored of the same accessories hair slip? We nor provide a really cute hair clip to make your life sweeter everyday now!', 'https://i.imgur.com/KLvTtPD.png');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(5) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`) VALUES
(1, 'rifan1', 'sayarifan123'),
(2, 'vanes1', 'sayavanes123'),
(3, 'rosa1', 'sayarosa123'),
(8, 'rifan2', 'sayarifan123'),
(9, 'rifan3', 'sayarifan123'),
(10, 'rifan4', 'sayarifan123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
