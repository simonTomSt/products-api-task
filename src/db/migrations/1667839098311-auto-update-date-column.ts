import { MigrationInterface, QueryRunner } from "typeorm";

export class autoUpdateDateColumn1667839098311 implements MigrationInterface {
    name = 'autoUpdateDateColumn1667839098311'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "updateDate" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "price", "updateDate") SELECT "id", "name", "price", "updateDate" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "price" integer NOT NULL, "updateDate" datetime NOT NULL)`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "price", "updateDate") SELECT "id", "name", "price", "updateDate" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
    }

}
