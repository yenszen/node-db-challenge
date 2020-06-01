exports.seed = function(knex) {
  return knex("tasks").insert([
    {
      description: "send out invitations",
      notes: "ensure address is correct",
      project_id: 1
    },
    {
      description: "check number of attendees",
      notes: "ensure all seats are allocated",
      project_id: 1
    },
    {
      description: "check inventory",
      notes: "ensure there is sufficient materials for building prototype",
      project_id: 2
    }
  ]);
};
