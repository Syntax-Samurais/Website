import { getPsql } from "../../../../db.js";

export async function GET(request) {
  const queryParams = new URL(request.url).searchParams;
  const user_id = queryParams.get("id");
  let psql = await getPsql();
  // const { date } = request.json();
  // console.log(date)
  let results = await psql.query(
    "SELECT weight_history.user_id, weight_history.weight, calorie_history.calories, weight_history.date FROM weight_history INNER JOIN calorie_history ON weight_history.user_id = calorie_history.user_id and weight_history.date = calorie_history.date WHERE weight_history.user_id = $1 GROUP BY weight_history.user_id, weight_history.weight, calorie_history.calories, weight_history.date ORDER BY weight_history.date DESC;",
    [user_id],
  );
  // console.log(results.rows);
  // let info = [];
  // for (let i = 0; i < 7; i++) {
  //   // console.log(results.rows[i]);
  //   info.push(results.rows[i]);
  // }
  return new Response(JSON.stringify(results.rows), {
    contentType: "application/json",
  });
}

export async function POST(request, response) {
  // const queryParams = new URL(request.url).searchParams;
  // const user_id = queryParams.get("id");
  try {
    let psql = await getPsql();
    let body = await request.json();
    // let results = await psql.query("UPDATE goals set goal_calorie_intake = $1 where user_id = 1;", [body.calories]);
    let { user_id, currentDate, weight, calories } = body;

    // let currentDate = new Date().toISOString().split("T")[0];
    let previousresults = await psql.query(
      "SELECT weight_history.user_id, weight_history.weight, calorie_history.calories, weight_history.date FROM weight_history INNER JOIN calorie_history ON weight_history.user_id = calorie_history.user_id and weight_history.date = calorie_history.date WHERE weight_history.user_id = $1 GROUP BY weight_history.user_id, weight_history.weight, calorie_history.calories, weight_history.date ORDER BY weight_history.date DESC;",
      [user_id],
    );
    // console.log(previousresults.rows);
    let weightQuery = `
      INSERT INTO weight_history (user_id, date, weight) 
      VALUES ($1, $2, $3)
    `;
    let weightValues = [user_id, currentDate, weight];
    let caloriesQuery = `
      INSERT INTO calorie_history (user_id, date, calories) 
      VALUES ($1, $2, $3)
    `;
    let caloriesValues = [user_id, currentDate, calories];
    for (let i = 0; i < previousresults.rows.length; i++) {
      //  console.log("For loop entered", previousresults.rows[i].date.toISOString().split("T")[0])
      if (
        currentDate == previousresults.rows[i].date.toISOString().split("T")[0]
      ) {
        // console.log("Update condition met", previousresults.rows[i].date)
        weightQuery =
          "Update weight_history SET weight = $1 WHERE user_id = $2 AND date = $3";
        weightValues = [weight, user_id, currentDate];

        caloriesQuery =
          "Update calorie_history SET calories = $1 WHERE user_id = $2 AND date = $3";
        caloriesValues = [calories, user_id, currentDate];
      }
    }

    await psql.query(weightQuery, weightValues);

    await psql.query(caloriesQuery, caloriesValues);

    let responseBody = {
      user_id: user_id,
      date: currentDate,
      weight: weight,
      calories: calories,
    };

    return new Response(JSON.stringify(responseBody), {
      contentType: "application/json",
    });
  } catch (error) {
    console.error("Error", error);

    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      contentType: "application/json",
    });
  }
}
