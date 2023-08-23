import { MigrationInterface, QueryRunner } from "typeorm";

export class MyMigration1691889735793 implements MigrationInterface {
    name = 'MyMigration1691889735793'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_db5dc449943f966ade9b5abd78f"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_380adfed7b8d4a9bcc1e42d44c0"`);
        await queryRunner.query(`CREATE TABLE "follows" ("id" SERIAL NOT NULL, "followerId" integer, "followed" integer, "userId" integer, "followsId" integer, CONSTRAINT "PK_8988f607744e16ff79da3b8a627" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "likes" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "threadId" integer, CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP COLUMN "parentId"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "likes"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "isLikes"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "replies"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "isReply"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "commentId"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "threadId"`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD "content" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP CONSTRAINT "FK_620f6bb5fb7fa72342c955e9aaf"`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP CONSTRAINT "FK_21e309254be8b9a6920085f3329"`);
        await queryRunner.query(`ALTER TABLE "Reply" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" ALTER COLUMN "threadId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD CONSTRAINT "FK_21e309254be8b9a6920085f3329" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD CONSTRAINT "FK_620f6bb5fb7fa72342c955e9aaf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_eeb492da6894abf2e0acceb53f2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follows" ADD CONSTRAINT "FK_fe6c9879d6c2464e1506361fd4d" FOREIGN KEY ("followsId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_111596eb3f640a4c675ca0b6b9d" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_111596eb3f640a4c675ca0b6b9d"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_fe6c9879d6c2464e1506361fd4d"`);
        await queryRunner.query(`ALTER TABLE "follows" DROP CONSTRAINT "FK_eeb492da6894abf2e0acceb53f2"`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP CONSTRAINT "FK_620f6bb5fb7fa72342c955e9aaf"`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP CONSTRAINT "FK_21e309254be8b9a6920085f3329"`);
        await queryRunner.query(`ALTER TABLE "Reply" ALTER COLUMN "threadId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD CONSTRAINT "FK_21e309254be8b9a6920085f3329" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD CONSTRAINT "FK_620f6bb5fb7fa72342c955e9aaf" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Reply" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "threadId" integer`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "commentId" integer`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "isReply" boolean`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "replies" integer`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "isLikes" boolean`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "likes" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD "parentId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "Reply" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "likes"`);
        await queryRunner.query(`DROP TABLE "follows"`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_380adfed7b8d4a9bcc1e42d44c0" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_db5dc449943f966ade9b5abd78f" FOREIGN KEY ("commentId") REFERENCES "Reply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
