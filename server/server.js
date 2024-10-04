import app from "./expressApp.js"
import pool from './db.js';

const PORT = process.env.PORT || 8000;

app.get('/db-status', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()');
      res.json({ status: 'Connected', timestamp: result.rows[0].now });
    } catch (err) {
      console.error('Connection error', err);
      res.status(500).json({ status: 'Not connected', error: err.message });
    }
  });

export const StartServer = async () => {

    app.listen(8000, () => {
        console.log("Listening to: ", PORT)
    })

    process.on("uncaughtException", async (err) => {
        console.log(err)
        process.exit(1)
    })
}

StartServer()