CREATE TABLE `areaStats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`area` varchar(255) NOT NULL,
	`totalShirts` int NOT NULL DEFAULT 0,
	`totalSpent` decimal(12,2) NOT NULL DEFAULT '0',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `areaStats_id` PRIMARY KEY(`id`),
	CONSTRAINT `areaStats_area_unique` UNIQUE(`area`)
);
--> statement-breakpoint
CREATE TABLE `inventory` (
	`id` int AUTO_INCREMENT NOT NULL,
	`size` enum('P','M','G','GG') NOT NULL,
	`quantity` int NOT NULL DEFAULT 0,
	`costPerUnit` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `inventory_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fullName` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`matricula` varchar(50) NOT NULL,
	`area` varchar(255) NOT NULL,
	`size` enum('P','M','G','GG') NOT NULL,
	`model` enum('tradicional','baby-look') NOT NULL,
	`status` enum('aguardando','aprovada','aguardando_entrega','entregue','rejeitada') NOT NULL DEFAULT 'aguardando',
	`approvedBy` int,
	`approvedAt` timestamp,
	`deliveredBy` int,
	`deliveredAt` timestamp,
	`rejectionReason` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `requests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','manager') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `area` varchar(255);