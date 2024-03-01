import { getPsql } from "../../../db.js";

export async function GET(request) {
  let psql = await getPsql();
  let results = await psql.query(
    "SELECT goal_calorie_intake from goals where user_id = 1;",
  );
  // console.log(results);
  return new Response(JSON.stringify(results.rows), {
    contentType: "application/json",
  });
}

// export async function GET(request) {
//   let psql = await getPsql();
//   let results = await psql.query(
//     "SELECT * from weight_history where user_id = 1;",
//   );
//   // console.log(results);
//   return new Response(JSON.stringify(results.rows), {
//     contentType: "application/json",
//   });
// }

export async function POST(request, response) {
  try {
    let psql = await getPsql();
    let body = await request.json();
    // let results = await psql.query("UPDATE goals set goal_calorie_intake = $1 where user_id = 1;", [body.calories]);
    let { user_id, weight, calories } = body;

    let currentDate = new Date().toISOString().split("T")[0];

    let weightQuery = `
      INSERT INTO weight_history (user_id, date, weight) 
      VALUES ($1, $2, $3)
    `;

    let caloriesQuery = `
      INSERT INTO calorie_history (user_id, date, calories) 
      VALUES ($1, $2, $3)
    `;

    let weightValues = [user_id, currentDate, weight];
    await psql.query(weightQuery, weightValues);

    let caloriesValues = [user_id, currentDate, calories];
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

// export async function POST(request, response) {
//   try {
//     let psql = await getPsql();
//     let body = await request.json(); // Parse the request body as JSON

//     // Access user_id, weight, and calories from the parsed JSON body
//     let { user_id, weight, calories } = body;

//     // Example SQL query to insert data into weight_history table
//     let weightQuery = `
//       INSERT INTO weight_history (user_id, weight)
//       VALUES ($1, $2)
//     `;

//     // Example SQL query to insert data into calorie_history table
//     let calorieQuery = `
//       INSERT INTO calorie_history (user_id, calories)
//       VALUES ($1, $2)
//     `;

//     // Parameters for the queries, to prevent SQL injection
//     let weightValues = [user_id, weight];
//     let calorieValues = [user_id, calories];

//     // Begin a transaction
//     await psql.query('BEGIN');

//     // Execute the INSERT statements within the transaction
//     await psql.query(weightQuery, weightValues);
//     await psql.query(calorieQuery, calorieValues);

//     // Commit the transaction if everything succeeded
//     await psql.query('COMMIT');

//     // Send back a response indicating success
//     return new Response(JSON.stringify({ message: "Data inserted successfully" }), {
//       contentType: "application/json",
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     // Rollback the transaction if an error occurred
//     await psql.query('ROLLBACK');

//     // Return an error response if something goes wrong
//     return new Response(JSON.stringify({ error: "Something went wrong" }), {
//       status: 500,
//       contentType: "application/json",
//     });
//   }
// }
