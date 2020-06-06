import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("item").insert([
    { title: "Lâmpadas", image: "lampadas.svg" },
    { title: "Pilhas e Baterias", image: "pilhas.svg" },
    { title: "Papéis e Papelão", image: "papeis-papelao.svg" },
    { title: "Resíduos Eletrônicos", image: "eletronicos.svg" },
    { title: "Resíduos Ôrganicos", image: "organicos.svg" },
    { title: "Oléo de Cozinha", image: "oleo.svg" },
  ]);
}
