CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(300) NOT NULL,
	`slug` varchar(300) NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`category` enum('bilmog','pensionsgutachten','bav','recht','aktuelles') NOT NULL DEFAULT 'aktuelles',
	`author` varchar(200) NOT NULL,
	`isPublished` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_slug_unique` UNIQUE(`slug`)
);
