import { getPsql } from "../../../../db.js";

export async function PATCH(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");
    const res = await request.json();
    const {
      goal_weight,
      weight_goal_date,
      goal_calorie_intake,
      goal_weekly_miles,
      gain_weight,
      increase_running,
      lose_weight,
      maintain_weight,
    } = res;

    console.log("Request body", res);

    let psql = await getPsql();
    // Update the goals table with the new goal values
    let results = await psql.query(
      "UPDATE goals SET goal_weight = COALESCE($1, goal_weight), weight_goal_date = COALESCE(TO_DATE($2, 'YYYY-MM-DD'), weight_goal_date), goal_calorie_intake = COALESCE($3, goal_calorie_intake), goal_weekly_miles = COALESCE($4, goal_weekly_miles) WHERE user_id = $5",
      [
        goal_weight,
        weight_goal_date,
        goal_calorie_intake,
        goal_weekly_miles,
        userId,
      ],
    );

    // Update user_interests table with the new interest values gain_weight, increase_running, lose_weight, maintain_weight
    let userInterests = await psql.query(
      "UPDATE user_interests SET gain_weight = COALESCE($1, gain_weight), increase_running = COALESCE($2, increase_running), lose_weight = COALESCE($3, lose_weight), maintain_weight = COALESCE($4, maintain_weight) WHERE user_id = $5",
      [gain_weight, increase_running, lose_weight, maintain_weight, userId],
    );

    return new Response(JSON.stringify(results.rows[0]), {
      contentType: "application/json",
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      contentType: "application/json",
    });
  }
}
