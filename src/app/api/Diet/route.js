import { getPsql } from "../../db.js";
// import { NextApiRequest, NextApiResponse } from 'next'

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

export async function POST(request, response) {
  let psql = await getPsql();
  let weight = await request.json();
  // let results = await psql.query("UPDATE goals set goal_calorie_intake = $1 where user_id = 1;", [body.calories]);
  console.log(weight);
  return new Response(JSON.stringify(request.body), {
    contentType: "application/json",
  });
}
