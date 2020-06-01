exports.seed = function(knex) {
  return knex("projects").insert([
    {
      name: "host event",
      description: "make preparations for hosting networking event"
    },
    {
      name: "build prototype",
      description: "start work on building a version 1 for new product"
    }
  ]);
};
