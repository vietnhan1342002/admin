import { MigrationInterface, QueryRunner } from 'typeorm';

export class AutoMigration1767796128893 implements MigrationInterface {
  name = 'AutoMigration1767796128893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'staff', 'doctor') NOT NULL, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`avatar_url\` text NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`is_verify_email\` tinyint NOT NULL, \`phone\` varchar(20) NOT NULL, INDEX \`IDX_ca8c0488e0cb4427ce4042c63f\` (\`last_name\`, \`deleted_at\`), INDEX \`IDX_160667a403c2bf4828027da172\` (\`first_name\`, \`deleted_at\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`email_verification_token\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NOT NULL, \`token\` varchar(255) NOT NULL, \`expired_at\` timestamp NOT NULL, \`used_at\` timestamp NULL, UNIQUE INDEX \`IDX_2a908516a5e0251ceca4d2bdad\` (\`token\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`staff\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(255) NOT NULL, \`position\` varchar(100) NOT NULL, \`status\` enum ('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active', \`date_added\` date NOT NULL, INDEX \`IDX_e75685601ba1500517e63b8088\` (\`status\`, \`deleted_at\`), INDEX \`IDX_6490d307b7b032a51a227b6cb5\` (\`position\`, \`deleted_at\`), UNIQUE INDEX \`IDX_092247d7ecf46e7b45acc7f8cb\` (\`user_id\`, \`deleted_at\`), UNIQUE INDEX \`REL_cec9365d9fc3a3409158b645f2\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`appointment_slots\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`doctor_shift_id\` varchar(255) NOT NULL, \`slot_date\` date NOT NULL, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`status\` enum ('available', 'booked', 'blocked', 'cancelled') NOT NULL DEFAULT 'available', \`version\` int NOT NULL, UNIQUE INDEX \`ux_appointment_slot_unique\` (\`doctor_shift_id\`, \`slot_date\`, \`start_time\`, \`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`doctor_shift\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`doctor_id\` varchar(255) NOT NULL, \`shift_type\` enum ('morning', 'afternoon', 'evening', 'full_day', 'custom') NOT NULL, \`shift_date\` date NOT NULL, \`start_time\` time NULL, \`end_time\` time NULL, \`slot_duration_minutes\` int NOT NULL DEFAULT '30', \`status\` enum ('planned', 'completed', 'cancelled') NOT NULL DEFAULT 'planned', INDEX \`idx_doctor_shift_status_active\` (\`status\`, \`deleted_at\`), INDEX \`idx_doctor_shift_date_active\` (\`shift_date\`, \`deleted_at\`), INDEX \`idx_doctor_shift_doctor_status_active\` (\`doctor_id\`, \`status\`, \`deleted_at\`), INDEX \`idx_doctor_shift_doctor_date_active\` (\`doctor_id\`, \`shift_date\`, \`deleted_at\`), INDEX \`idx_doctor_shift_doctor_id\` (\`doctor_id\`, \`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`doctor\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`email\` varchar(255) NOT NULL, \`first_name\` varchar(100) NOT NULL, \`last_name\` varchar(100) NOT NULL, \`phone\` varchar(100) NOT NULL, \`avatar_url\` text NULL, \`specialty\` enum ('cardiology', 'dermatology', 'neurology', 'pediatrics') NOT NULL DEFAULT 'pediatrics', \`department\` varchar(200) NULL, \`experience\` int NULL, \`degrees\` varchar(255) NULL, \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`date_added\` date NOT NULL, UNIQUE INDEX \`IDX_bf6303ac911efaab681dc911f5\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`banner\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`title\` varchar(255) NOT NULL, \`image_url\` varchar(500) NOT NULL, \`ridirect_url\` varchar(500) NULL, \`position\` enum ('homepage_top', 'homepage_middle', 'homepage_bottom', 'sidebar') NOT NULL DEFAULT 'homepage_top', \`status\` enum ('active', 'inactive') NOT NULL DEFAULT 'active', \`startAt\` datetime NULL, \`endAt\` datetime NULL, INDEX \`IDX_552b583bef118455a01d2803df\` (\`status\`, \`deleted_at\`), UNIQUE INDEX \`IDX_f9427bb6119579c640eb2529fb\` (\`title\`, \`deleted_at\`), UNIQUE INDEX \`IDX_15800823f6b98273fcdcc7ffe0\` (\`image_url\`, \`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_verification_token\` ADD CONSTRAINT \`FK_b9ff7bf0d4ef247fff0d33f6ac0\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`staff\` ADD CONSTRAINT \`FK_cec9365d9fc3a3409158b645f2e\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment_slots\` ADD CONSTRAINT \`FK_eb362dd4318a771b9d4c24b6b34\` FOREIGN KEY (\`doctor_shift_id\`) REFERENCES \`doctor_shift\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor_shift\` ADD CONSTRAINT \`FK_73b2e245adfe3fcecebb8cef3b6\` FOREIGN KEY (\`doctor_id\`) REFERENCES \`doctor\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`doctor_shift\` DROP FOREIGN KEY \`FK_73b2e245adfe3fcecebb8cef3b6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment_slots\` DROP FOREIGN KEY \`FK_eb362dd4318a771b9d4c24b6b34\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`staff\` DROP FOREIGN KEY \`FK_cec9365d9fc3a3409158b645f2e\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`email_verification_token\` DROP FOREIGN KEY \`FK_b9ff7bf0d4ef247fff0d33f6ac0\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_15800823f6b98273fcdcc7ffe0\` ON \`banner\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f9427bb6119579c640eb2529fb\` ON \`banner\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_552b583bef118455a01d2803df\` ON \`banner\``,
    );
    await queryRunner.query(`DROP TABLE \`banner\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_bf6303ac911efaab681dc911f5\` ON \`doctor\``,
    );
    await queryRunner.query(`DROP TABLE \`doctor\``);
    await queryRunner.query(
      `DROP INDEX \`idx_doctor_shift_doctor_id\` ON \`doctor_shift\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_doctor_shift_doctor_date_active\` ON \`doctor_shift\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_doctor_shift_doctor_status_active\` ON \`doctor_shift\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_doctor_shift_date_active\` ON \`doctor_shift\``,
    );
    await queryRunner.query(
      `DROP INDEX \`idx_doctor_shift_status_active\` ON \`doctor_shift\``,
    );
    await queryRunner.query(`DROP TABLE \`doctor_shift\``);
    await queryRunner.query(
      `DROP INDEX \`ux_appointment_slot_unique\` ON \`appointment_slots\``,
    );
    await queryRunner.query(`DROP TABLE \`appointment_slots\``);
    await queryRunner.query(
      `DROP INDEX \`REL_cec9365d9fc3a3409158b645f2\` ON \`staff\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_092247d7ecf46e7b45acc7f8cb\` ON \`staff\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_6490d307b7b032a51a227b6cb5\` ON \`staff\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e75685601ba1500517e63b8088\` ON \`staff\``,
    );
    await queryRunner.query(`DROP TABLE \`staff\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_2a908516a5e0251ceca4d2bdad\` ON \`email_verification_token\``,
    );
    await queryRunner.query(`DROP TABLE \`email_verification_token\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_160667a403c2bf4828027da172\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ca8c0488e0cb4427ce4042c63f\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
