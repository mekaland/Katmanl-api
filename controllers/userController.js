const express = require("express");
const { body, validationResult } = require("express-validator");
const debug = require("debug")("app:main");
const userService = require("../services/userService");

const router = express.Router();

// GET: Tüm kullanıcılar
router.get("/", async (req, res) => {
  const { id } = req.query;
  debug(`GET /users çağrıldı. Query id: ${id}`);
  try {
    if (id) {
      const user = await userService.getUserById(id);
      res.json(user);
    } else {
      const users = await userService.getAllUsers();
      res.json(users);
    }
  } catch (err) {
    debug(`GET /users hatası: ${err.message}`);
    res.status(404).json({ error: err.message });
  }
});

// GET: ID'ye göre kullanıcı
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  debug(`GET /users/${id} çağrıldı`);
  try {
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (err) {
    debug(`GET /users/${id} hatası: ${err.message}`);
    res.status(404).json({ error: err.message });
  }
});

// POST: Yeni kullanıcı
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("İsim gerekli"),
    body("email").isEmail().withMessage("Geçerli bir e-posta gerekli"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      debug(`POST /users doğrulama hatası: ${JSON.stringify(errors.array())}`);
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email } = req.body;
    debug(`POST /users çağrıldı. Body: ${JSON.stringify(req.body)}`);
    try {
      const user = await userService.createUser(name, email);
      res.status(201).json(user);
    } catch (err) {
      debug(`POST /users hatası: ${err.message}`);
      res.status(500).json({ error: err.message });
    }
  }
);

// PUT: Kullanıcı güncelle
router.put(
  "/:id",
  [
    body("name").notEmpty().withMessage("İsim gerekli"),
    body("email").isEmail().withMessage("Geçerli bir e-posta gerekli"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      debug(
        `PUT /users/${req.params.id} doğrulama hatası: ${JSON.stringify(
          errors.array()
        )}`
      );
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name, email } = req.body;
    debug(
      `PUT /users/${id} çağrıldı. Yeni veriler: ${JSON.stringify(req.body)}`
    );
    try {
      const user = await userService.updateUser(id, name, email);
      res.json(user);
    } catch (err) {
      debug(`PUT /users/${id} hatası: ${err.message}`);
      res.status(404).json({ error: err.message });
    }
  }
);

// DELETE: Kullanıcı sil
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  debug(`DELETE /users/${id} çağrıldı`);
  try {
    const result = await userService.deleteUser(id);
    res.json(result);
  } catch (err) {
    debug(`DELETE /users/${id} hatası: ${err.message}`);
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
