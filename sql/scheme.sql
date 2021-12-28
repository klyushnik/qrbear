-- qrbear_inventory.bin definition

CREATE TABLE `bin` (
  `bin_id` int(11) NOT NULL AUTO_INCREMENT,
  `bin_name` varchar(50) NOT NULL,
  `bin_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`bin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- qrbear_inventory.item definition

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_upc` varchar(13) DEFAULT NULL,
  `item_name` varchar(50) NOT NULL,
  `item_desc` varchar(255) DEFAULT NULL,
  `item_sku_id` varchar(15) NOT NULL,
  `item_category` varchar(20) DEFAULT NULL,
  `item_saleprice` float DEFAULT 0,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- qrbear_inventory.item_bin definition

CREATE TABLE `item_bin` (
   `item_id` int(11) NOT NULL,
  `bin_id` int(11) NOT NULL,
  `item_count` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`item_id`,`bin_id`),
  KEY `FK_item_bin_bin_id` (`bin_id`),
  CONSTRAINT `FK_item_bin_bin_id` FOREIGN KEY (`bin_id`) REFERENCES `bin` (`bin_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_item_bin_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- qrbear_inventory.location definition

CREATE TABLE `location` (
  `loc_id` int(11) NOT NULL AUTO_INCREMENT,
  `loc_index` varchar(15) DEFAULT NULL,
  `loc_name` varchar(50) DEFAULT NULL,
  `loc_desc` varchar(255) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `item_count` int(11) DEFAULT 1,
  `aisle_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`loc_id`),
  KEY `FK_location_item_id` (`item_id`),
  CONSTRAINT `FK_location_item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;