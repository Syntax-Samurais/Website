import { getPsql } from "../../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  let results = await psql.query("SELECT * FROM users");
  console.log(results);
  return new Response(JSON.stringify(results.rows), {
    contentType: "application/json",
  });
}
