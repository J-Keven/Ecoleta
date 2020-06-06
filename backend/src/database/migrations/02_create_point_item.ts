import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("point_item", (table) => {
    table.increments("id");
    table.integer("id_point").notNullable();
    table.integer("id_item").notNullable();

    table
      .foreign("id_point")
      .references("id")
      .inTable("point")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("id_item")
      .references("id")
      .inTable("item")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("point_item");
}
