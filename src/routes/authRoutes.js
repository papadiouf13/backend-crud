const router         = require('express').Router();
const ctrl           = require('../controllers/AuthController');


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Création de compte
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:        { type: string }
 *               lastName:         { type: string }
 *               address:          { type: string }
 *               phone:            { type: string }
 *               email:            { type: string }
 *               password:         { type: string }
 *               confirm_password: { type: string }
 *     responses:
 *       201: { description: Utilisateur créé }
 */
router.post('/register', ctrl.register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Connexion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:    { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: JWT retourné }
 */
router.post('/login', ctrl.login);


module.exports = router;



