import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import pool from "../../db";
import { Pool } from "pg";

dotenv.config({ path: "../.env" });

// const { PORT, DATABASE_URL } = process.env;

const client = new pg.Client({
  connectionString: DATABASE_URL,
});

await client.connect();

const app = express();

app.use(express.json());
