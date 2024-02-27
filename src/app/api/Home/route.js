import { getPsql } from "../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  let userData = await psql.query("SELECT * FROM users WHERE id = 1");
  let calorieData = await psql.query(
    "SELECT * FROM calorie_history WHERE id = 1",
  );
  let goals = await psql.query("SELECT * FROM goals WHERE id = 1");
  let runData = await psql.query("SELECT * FROM run_history WHERE id = 1");
  let weightData = await psql.query(
    "SELECT * FROM weight_history WHERE id = 1",
  );
  let userInterestData = await psql.query(
    "SELECT * FROM user_interests WHERE id = 1",
  );

  let results = {
    userData: userData.rows,
    calorieData: calorieData.rows,
    goals: goals.rows,
    runData: runData.rows,
    weightData: weightData.rows,
    userInterestData: userInterestData.rows,
  };

  return new Response(JSON.stringify(results), {
    contentType: "application/json",
  });
}
