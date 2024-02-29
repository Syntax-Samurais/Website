import { getPsql } from "../../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  // const queryParams = new URL(request.url).searchParams;

  const queryParams = new URL(request.url).searchParams;
  const user_id = queryParams.get("id");

  let goals = await psql.query("SELECT * FROM goals WHERE user_id = $1", [
    user_id,
  ]);

  let userInterests = await psql.query(
    "SELECT * FROM user_interests WHERE user_id = $1",
    [user_id],
  );

  let runHistory = await psql.query(
    "SELECT * FROM run_history WHERE user_id = $1 ORDER BY date DESC LIMIT 7",
    [user_id],
  );

  let weightHistory = await psql.query(
    "SELECT * FROM weight_history WHERE user_id = $1 ORDER BY date DESC LIMIT 1",
    [user_id],
  );

  let calorieHistory = await psql.query(
    "SELECT * FROM calorie_history WHERE user_id = $1 ORDER BY date DESC LIMIT 7",
    [user_id],
  );

  // console.log(results);
  let results = {
    goals: goals.rows,
    runHistory: runHistory.rows,
    weightHistory: weightHistory.rows,
    calorieHistory: calorieHistory.rows,
    userInterests: userInterests.rows,
  };

  return new Response(JSON.stringify(results), {
    contentType: "application/json",
  });
}
