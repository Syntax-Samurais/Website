import { getPsql } from "../../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  // const queryParams = new URL(request.url).searchParams;

  const queryParams = new URL(request.url).searchParams;
  const user_id = queryParams.get("id");

  let results = await psql.query("SELECT * FROM goals WHERE user_id = $1", [
    user_id,
  ]);

  console.log(results);

  return new Response(JSON.stringify(results.rows), {
    contentType: "application/json",
  });
}
