import express from "express";
import cors from "cors";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(express.json());

// Para empezar, permitimos llamadas desde cualquier origen.
// (Luego lo podemos limitar a tu URL del frontend)
app.use(cors({ origin: true }));

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: String(e) });
    }
});

// Registro: crea usuario (correo + password)
app.post("/api/register", async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).json({ ok: false, msg: "Complete todos los campos" });
    }

    try {
        const ex = await pool.query("SELECT id FROM usuarios WHERE correo=$1", [correo]);
        if (ex.rows.length) {
            return res.status(409).json({ ok: false, msg: "El usuario ya existe" });
        }

        await pool.query("INSERT INTO usuarios (correo, password) VALUES ($1,$2)", [correo, password]);
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ ok: false, error: String(e) });
    }
});

// Login: valida usuario
app.post("/api/login", async (req, res) => {
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).json({ ok: false, msg: "Complete todos los campos" });
    }

    try {
        const r = await pool.query(
            "SELECT id, correo FROM usuarios WHERE correo=$1 AND password=$2",
            [correo, password]
        );

        if (!r.rows.length) {
            return res.status(401).json({ ok: false, msg: "Correo o contraseña incorrectos" });
        }

        res.json({ ok: true, usuario: r.rows[0] });
    } catch (e) {
        res.status(500).json({ ok: false, error: String(e) });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("API running on", PORT));
