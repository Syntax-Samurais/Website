import { getPsql } from "../../../db.js";

export async function POST(request, response) {
  let psql = await getPsql();

  //based on what the goal is, we will insert the data into the database
  const {
    goal,
    before,
    after,
    username,
    password,
    goalDate,
    currentCalories,
    goalCalories,
    currentDate,
  } = await request.json();
  //   console.log(username, password);
  let results = await psql.query(
    "Insert into users (username, password) values ($1, crypt($2, gen_salt('bf'))) returning id;",
    [username, password],
  );
  //   console.log(results.rows[0].id);
  let id = results.rows[0].id;
  if (goal === "mileage") {
    await psql.query(
      "Insert into goals (user_id, initial_weekly_miles, goal_weekly_miles, weight_goal_date) values ($1, $2, $3, $4);",
      [id, before, after, goalDate],
    );
  } else if (
    goal === "sameWeight" ||
    goal === "loseWeight" ||
    goal === "gainWeight"
  ) {
    await psql.query(
      "Insert into goals (user_id,goal_weight, weight_goal_date, initial_calorie_intake, goal_calorie_intake) values ($1, $2, $3, $4, $5);",
      [id, after, goalDate, currentCalories, goalCalories],
    );
    await psql.query(
      "Insert into weight_history (user_id, weight, date) values ($1, $2, $3);",
      [id, before, currentDate],
    );
  }

  return new Response("user successfully added", {
    contentType: "application/json",
  });
}
