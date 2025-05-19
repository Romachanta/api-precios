const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let precios = {
  "cemento-avellaneda": 7900,
  "hierro-acindar": 10500
};

app.get('/precios/:producto', (req, res) => {
  const producto = req.params.producto.toLowerCase();
  const precio = precios[producto];
  if (precio) {
    res.json({ producto, precio });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.post('/precios', (req, res) => {
  const { producto, precio } = req.body;
  if (!producto || !precio) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  precios[producto.toLowerCase()] = precio;
  res.json({ mensaje: 'Precio actualizado', producto, precio });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});