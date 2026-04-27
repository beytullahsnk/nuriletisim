CREATE TABLE `phone_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`phone_id` integer NOT NULL,
	`url` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`phone_id`) REFERENCES `phones`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `phones` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`brand` text NOT NULL,
	`model` text NOT NULL,
	`storage` text,
	`color` text,
	`condition` text NOT NULL,
	`price_try` integer NOT NULL,
	`description` text,
	`in_stock` integer DEFAULT true NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `phones_slug_unique` ON `phones` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_phones_brand` ON `phones` (`brand`);--> statement-breakpoint
CREATE INDEX `idx_phones_featured` ON `phones` (`featured`);