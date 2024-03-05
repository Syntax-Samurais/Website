import { getPsql } from "../../../db.js";

export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");
  let psql = await getPsql();

  if (url.searchParams.get("goal") === "weekly") {
    let results = await psql.query(
      "SELECT goal_weekly_miles FROM goals WHERE user_id = $1",
      [userId],
    );
    console.log(results.rows);
    return new Response(JSON.stringify(results.rows), {
      contentType: "application/json",
    });
  } else {
    let results = await psql.query(
      "SELECT date, miles_ran, run_time FROM run_history WHERE user_id = $1",
      [userId],
    );
    return new Response(JSON.stringify(results.rows), {
      contentType: "application/json",
    });
  }
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

export async function DELETE(request, response) {
  try {
    let psql = await getPsql();
    let body = await request.json();

    const { user_id, currentDate, miles, time } = body;

    await psql.query(
      "DELETE from run_history WHERE user_id = $1 and date = $2 and miles_ran = $3 and run_time = $4;",
      [user_id, currentDate, miles, time],
    );

    return new Response(JSON.stringify({ success: "successfully deleted" }));
  } catch (error) {
    console.error("Error", error);

    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      contentType: "application/json",
    });
  }
}
