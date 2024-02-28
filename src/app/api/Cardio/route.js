import { getPsql } from "../../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  let results = await psql.query(
    "SELECT date, miles_ran, run_time FROM run_history WHERE user_id = $1",
    [1],
  );
  // Using 1 for now, needs to be dynamic -> Missing run_time (waiting refactor)
  console.log(results);

  return new Response(JSON.stringify(results.rows), {
    contentType: "application/json",
  });
}

export async function POST(request) {
  try {
    let psql = await getPsql();
    let { date, run_time, miles_ran } = request.body;

    let results = await psql.query(
      "INSERT INTO run_history (date, run_time, miles_ran, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [date, run_time, miles_ran, 1],
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
