import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class OrderStatus1654106109656 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_status',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        code: 'open',
        description: 'aguardando recepção',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        code: 'estimating',
        description: 'em estimativa',
      })
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        code: 'planning',
        description: 'em planejamento',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        code: 'producing',
        description: 'em produção',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        code: 'delivering',
        description: 'em rota de entrega',
      })
      .execute();
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('order_status')
      .values({
        code: 'closed',
        description: 'concluído',
      })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_status');
  }
}
