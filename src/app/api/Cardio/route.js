import { getPsql } from "../../../db.js";

export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

  console.log("UserId: ", userId);

  let psql = await getPsql();
  let results = await psql.query(
    "SELECT date, miles_ran, run_time FROM run_history WHERE user_id = $1",
    [userId],
  );

  return new Response(JSON.stringify(results.rows), {
    contentType: "application/json",
  });
}

export async function POST(request) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");
    const res = await request.json();
    const { date, run_time, miles_ran } = await res;

    let psql = await getPsql();
    let results = await psql.query(
      "INSERT INTO run_history (user_id, date, miles_ran, run_time) VALUES ($1, $2, $3, $4)",
      [userId, date, miles_ran, run_time],
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
