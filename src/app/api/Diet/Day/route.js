import { getPsql } from "../../../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  const { date } = request.json();
  // console.log(date)
  let results = await psql.query(
    "Select weight_history.user_id, weight, calories, weight_history.date from weight_history INNER JOIN calorie_history on weight_history.user_id= calorie_history.user_id and weight_history.user_id=3 Order by weight_history.date DESC;",
  );
  // console.log(results.rows);
  let info = [];
  for (let i = 0; i < 7; i++) {
    console.log(results.rows[i]);
    info.push(results.rows[i]);
  }
  return new Response(JSON.stringify(info), {
    contentType: "application/json",
  });
}
