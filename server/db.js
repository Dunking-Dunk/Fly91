import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error("Error acquiring client", err.stack);
    } else {
        client.query("SELECT NOW()", (err, result) => {
            release();
            if (err) {
                console.error("Error executing query", err.stack);
            } else {
                console.log("Connected to PostgreSQL database"); //at:', result.rows[0].now
            }
        });
    }
});

export default pool;
