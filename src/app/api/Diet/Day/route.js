import { getPsql } from "../../../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  const { date } = request.json();
  // console.log(date)
  let results = await psql.query(
    "Select weight_history.user_id, weight, calories, weight_history.date from weight_history INNER JOIN calorie_history on weight_history.user_id= calorie_history.user_id AND weight_history.date = calorie_history.date where weight_history.user_id = 1  AND (weight_history.date = '2024-02-28' OR calorie_history.date = '2024-02-28');",
  );
  console.log(results);
  return new Response(JSON.stringify(results.rows[0]), {
    contentType: "application/json",
  });
}
