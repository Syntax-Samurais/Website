import { getPsql } from "../../db.js";

export async function GET(request) {
  const queryParams = new URL(request.url).searchParams;
  const username = queryParams.get("username");
  const password = queryParams.get("password");

  if (!username || !password) {
    return new Response("Username and password are required.", {
      status: 400,
    });
  }

  let psql = await getPsql();
  let results = await psql.query(
    "SELECT * FROM users WHERE username = $1 AND password = $2",
    [username, password],
  );

  if (results.rows.length === 0) {
    return new Response("Invalid username or password.", {
      status: 401,
    });
  }

  return new Response("Login successful!", {
    status: 200,
  });
}
