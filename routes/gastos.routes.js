const express = require('express');
const router = express.Router();
const Gasto = require('../models/Gasto');

router.post('/', async (req, res) => {
  try {
    const { descripcion, categoria, monto, fecha } = req.body;

    if (!descripcion || !categoria || !monto || !fecha) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }

    const gasto = new Gasto({
      descripcion,
      categoria,
      monto,
      fecha,
      usuario: {
        nombre: 'Santi',
        fotoUrl: '/avatar.png'
      }
    });

    await gasto.save();
    res.json({ message: 'Gasto guardado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/', async (req, res) => {
  const gastos = await Gasto.find();
  res.json(gastos);
});

router.get('/perfil', async (req, res) => {
  const gasto = await Gasto.findOne();
  res.json(gasto ? gasto.usuario : null);
});
router.put('/perfil', async (req, res) => {
  try {
    const { nombre, fotoUrl } = req.body;

    if (!nombre || !fotoUrl) {
      return res.status(400).json({ message: 'nombre y fotoUrl son requeridos' });
    }

    // Si existe al menos un gasto, actualizamos el usuario en TODOS los gastos
    const existe = await Gasto.findOne();
    if (!existe) {
      return res.status(404).json({
        message: 'No hay gastos registrados. Crea un gasto primero para tener perfil.'
      });
    }

    await Gasto.updateMany(
      {},
      { $set: { 'usuario.nombre': nombre, 'usuario.fotoUrl': fotoUrl } }
    );

    res.json({ message: 'Perfil actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
