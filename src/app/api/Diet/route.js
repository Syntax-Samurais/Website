import { getPsql } from "../../../db.js";

export async function GET(request) {
  const queryParams = new URL(request.url).searchParams;
  const user_id = queryParams.get("id");
  // console.log(user_id);
  let psql = await getPsql();
  let results = await psql.query(
    "SELECT goal_calorie_intake from goals where user_id = $1;",
    [user_id],
  );
  // console.log(results);
  return new Response(JSON.stringify(results.rows), {
    contentType: "application/json",
  });
}
