exports.seed = function(knex) {
  return knex("resources").insert([
    {
      name: "marketing team",
      description: "handles marketing operations"
    },
    {
      name: "event space",
      description: "to host events"
    },
    {
      name: "engineering team",
      description: "handles prototyping tasks"
    },
    {
      name: "management team",
      description: "in charge of organizing end-targets"
    }
  ]);
};
