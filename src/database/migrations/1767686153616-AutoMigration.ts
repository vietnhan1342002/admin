import { MigrationInterface, QueryRunner } from 'typeorm';

export class AutoMigration1767686153616 implements MigrationInterface {
  name = 'AutoMigration1767686153616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`appointment_slots\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` timestamp(6) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`doctor_shift_id\` varchar(255) NOT NULL, \`slot_date\` date NOT NULL, \`start_time\` time NOT NULL, \`end_time\` time NOT NULL, \`status\` enum ('available', 'booked', 'blocked', 'cancelled') NOT NULL DEFAULT 'available', UNIQUE INDEX \`ux_appointment_slot_unique\` (\`doctor_shift_id\`, \`slot_date\`, \`start_time\`, \`deleted_at\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`appointment_slots\` ADD CONSTRAINT \`FK_eb362dd4318a771b9d4c24b6b34\` FOREIGN KEY (\`doctor_shift_id\`) REFERENCES \`doctor_shift\`(\`id\`) ON DELETE RESTRICT ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`appointment_slots\` DROP FOREIGN KEY \`FK_eb362dd4318a771b9d4c24b6b34\``,
    );
    await queryRunner.query(
      `DROP INDEX \`ux_appointment_slot_unique\` ON \`appointment_slots\``,
    );
    await queryRunner.query(`DROP TABLE \`appointment_slots\``);
  }
}
