const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 10000;

app.use(cors());

let precios = [];

function cargarPrecios() {
  try {
    const data = fs.readFileSync("precios_backend.json", "utf8");
    precios = JSON.parse(data);
    console.log("✔ Lista de precios cargada:", precios.length, "productos");
  } catch (error) {
    console.error("❌ Error al cargar precios:", error.message);
    precios = [];
  }
}

// Cargar al iniciar
cargarPrecios();

app.get("/precios/:producto", (req, res) => {
  const nombre = req.params.producto.toLowerCase();
  const resultado = precios.find(p => p.producto.toLowerCase() === nombre);
  if (resultado) {
    res.json(resultado);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

app.get("/productos", (req, res) => {
  const nombres = precios.map(p => p.producto);
  res.json(nombres);
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en puerto ${port}`);
});
Actualización index.js con carga desde JSON
