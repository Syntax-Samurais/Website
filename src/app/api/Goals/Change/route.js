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
    } = await res;

    let psql = await getPsql();
    let results = await psql.query(
      "UPDATE goals SET goal_weight = COALESCE($1, goal_weight), weight_goal_date = COALESCE($2, weight_goal_date), goal_calorie_intake = COALESCE($3, goal_calorie_intake), goal_weekly_miles = COALESCE($4, goal_weekly_miles) WHERE user_id = $5",
      [
        goal_weight,
        weight_goal_date,
        goal_calorie_intake,
        goal_weekly_miles,
        userId,
      ],
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
