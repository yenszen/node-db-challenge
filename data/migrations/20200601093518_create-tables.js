exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments("id");
      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.string("description", 255);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })
    .createTable("resources", tbl => {
      tbl.increments("id");
      tbl
        .string("name", 128)
        .notNullable()
        .unique();
      tbl.string("description", 255);
    })
    .createTable("tasks", tbl => {
      tbl.increments("id");
      tbl
        .string("description", 128)
        .notNullable()
        .unique();
      tbl.string("notes", 255);
      tbl
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("project_resource", tbl => {
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resources.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      tbl.primary(["project_id", "resource_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resource")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
