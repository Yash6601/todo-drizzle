CREATE TABLE `todo_todo` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`text` varchar(256),
	`completed` boolean DEFAULT false,
	CONSTRAINT `todo_todo_id` PRIMARY KEY(`id`)
);
