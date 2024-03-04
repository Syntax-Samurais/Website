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
      userInterests,
    } = request.body;

    let psql = await getPsql();
    // Update the goals table with the new goal values
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

    // Update user_interests table
    for (const [interest, value] of Object.entries(userInterests)) {
      if (typeof value === "boolean") {
        // Insert or update in user_interests table with the boolean value of the checkbox
        await psql.query(
          "INSERT INTO user_interests (user_id, interests) VALUES ($1, $2) ON CONFLICT (user_id, interests) DO UPDATE SET interests = $3",
          [userId, interest, value],
        );
      }
    }

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
