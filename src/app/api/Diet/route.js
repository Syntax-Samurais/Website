import { getPsql } from "../../../db.js";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(request) {
  const queryParams = new URL(request.url).searchParams;
  const user_id = queryParams.get("id");
  console.log(user_id);
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

// export async function GET(request) {
//   let psql = await getPsql();
//   let results = await psql.query(
//     "SELECT * from weight_history where user_id = 1;",
//   );
//   // console.log(results);

//   let weightHistory = await psql.query(
//     "SELECT * from weight_history where user_id = 1 AND (date = '2024-02-28' OR date='2024-02-27' OR date='2024-02-27')",
//   );
//   let calorieHistory = await psql.query(
//     "SELECT * from calorie_history where user_id = 1 AND (date = '2024-02-28' OR date='2024-02-27' OR date='2024-02-27')",
//   );

//   // console.log(weightHistory)
//   // console.log(calorieHistory)
//   return new Response(JSON.stringify(results.rows), {
//     contentType: "application/json",
//   });
// }

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
