import { Pool } from "pg";

let connection = new Promise((resolve, reject) => {
  try {
    resolve(
      new Pool({
        connectionString:
          process.env.ENV === "production"
            ? process.env.DATABASE_URL
            : process.env.LOCAL_DATABASE_URL,
      }),
    );
  } catch (e) {
    reject(e);
  }
}).then((psql) => {
  return psql.connect();
});

export async function getPsql() {
  let psql = await connection;
  return psql;
}
