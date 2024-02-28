import { getPsql } from "../../db.js";
// import { globalId} from "../../_components/_modals/LoginModal.jsx"
export async function GET(request) {
  let psql = await getPsql();
  // const { id } = params;
  const queryParams = new URL(request.url).searchParams;
  const user_id = queryParams.get("id");

  let userData = await psql.query("SELECT * FROM users WHERE id = $1", [
    user_id,
  ]);
  let calorieData = await psql.query(
    "SELECT * FROM calorie_history WHERE user_id = 1",
  );
  let goals = await psql.query("SELECT * FROM goals WHERE user_id = $1", [
    user_id,
  ]);
  let runData = await psql.query(
    "SELECT * FROM run_history WHERE user_id = $1",
    [user_id],
  );
  let weightData = await psql.query(
    "SELECT * FROM weight_history WHERE user_id = $1",
    [user_id],
  );
  let userInterestData = await psql.query(
    "SELECT * FROM user_interests WHERE user_id = $1",
    [user_id],
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
