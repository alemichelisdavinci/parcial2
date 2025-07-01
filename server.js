// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos y JSON
app.use(express.static('public'));
app.use(express.json());

// Configurar almacenamiento de imágenes con Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// Ruta para obtener productos
app.get('/api/productos', (req, res) => {
  const data = fs.readFileSync('./productos.json', 'utf-8');
  res.json(JSON.parse(data));
});

// Ruta para agregar o editar producto
app.post('/api/productos', upload.single('imagen'), (req, res) => {
  const productosPath = './productos.json';
  const data = fs.readFileSync(productosPath, 'utf-8');
  const productos = JSON.parse(data);

  const body = req.body;
  const file = req.file;

  if (!body.nombre || !body.descripcion || !body.precio || !body.categoria || !body.stock) {
    return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
  }

  let producto;
  if (body.id) {
    // EDITAR producto existente
    producto = productos.find(p => p.id == body.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    producto.nombre = body.nombre;
    producto.descripcion = body.descripcion;
    producto.precio = parseFloat(body.precio);
    producto.categoria = body.categoria;
    producto.stock = parseInt(body.stock);
    if (file) producto.imagen = 'images/' + file.filename;
  } else {
    // AGREGAR nuevo producto
    const nuevoProducto = {
      id: productos.length > 0 ? productos[productos.length - 1].id + 1 : 1,
      nombre: body.nombre,
      descripcion: body.descripcion,
      precio: parseFloat(body.precio),
      categoria: body.categoria,
      stock: parseInt(body.stock),
      imagen: file ? 'images/' + file.filename : ''
    };

    productos.push(nuevoProducto);
    producto = nuevoProducto;
  }

  fs.writeFileSync(productosPath, JSON.stringify(productos, null, 2));
  res.status(201).json({ mensaje: 'Producto guardado correctamente', producto });
});

// Ruta para eliminar producto
app.delete('/api/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const productosPath = './productos.json';
  const data = fs.readFileSync(productosPath, 'utf-8');
  const productos = JSON.parse(data);

  const nuevos = productos.filter(p => p.id !== id);
  if (nuevos.length === productos.length) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' });
  }

  fs.writeFileSync(productosPath, JSON.stringify(nuevos, null, 2));
  res.json({ mensaje: 'Producto eliminado correctamente' });
});

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
