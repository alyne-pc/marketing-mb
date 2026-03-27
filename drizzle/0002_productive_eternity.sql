CREATE TABLE `managers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`area` varchar(255) NOT NULL,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `managers_id` PRIMARY KEY(`id`),
	CONSTRAINT `managers_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `requests` ADD `telefone` varchar(20);--> statement-breakpoint
ALTER TABLE `requests` ADD `gestor` varchar(255);--> statement-breakpoint
ALTER TABLE `requests` ADD `isFirstRequest` int DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE `requests` ADD `lastRequestDate` timestamp;--> statement-breakpoint
ALTER TABLE `requests` ADD `motivo` text;