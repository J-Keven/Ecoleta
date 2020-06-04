import Knex from "knex";

export async function up(knex: Knex) {
  knex.schema.createTable("item", (table) => {
    table.increments("id");
    table.string("title").notNullable();
    table.string("image").notNullable();
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable("item");
}
