const express = require("express");
const cors = require("cors");
const supabase = require("./supabaseClient");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const { data, error } = await supabase
        .from("leads")
        .select("*");

    if (error) {
        return res.status(500).json(error);
    }

    res.json(data);
});

app.post("/leads", async (req, res) => {
    const { name, email, phone, notes, status } = req.body;

    const { data, error } = await supabase
        .from("leads")
        .insert([
            {
                name,
                email,
                phone,
                notes,
                status
            }
        ])
        .select();

    if (error) {
        return res.status(500).json(error);
    }

    res.json(data);
});
app.put("/leads/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, notes, status } = req.body;

    const { data, error } = await supabase
        .from("leads")
        .update({
            name,
            email,
            phone,
            notes,
            status
        })
        .eq("id", id)
        .select();

    if (error) {
        return res.status(500).json(error);
    }

    res.json(data);
});
app.delete("/leads/:id", async (req, res) => {
    const { id } = req.params;

    const { error } = await supabase
        .from("leads")
        .delete()
        .eq("id", id);

    if (error) {
        return res.status(500).json(error);
    }

    res.json({
        message: "Lead deleted"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});