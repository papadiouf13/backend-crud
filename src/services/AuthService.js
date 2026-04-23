const prisma = require('../config/database');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');


class AuthService {
  async register({ firstName, lastName, address, phone, email, password, confirm_password }) {
    if (password !== confirm_password) throw new Error('Les mots de passe ne correspondent pas');
    if (await prisma.user.findUnique({ where: { email } })) throw new Error('Email déjà utilisé');
    const hash = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { firstName, lastName, address, phone, email, password: hash }
    });
  }


  async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Utilisateur non trouvé');
    if (!await bcrypt.compare(password, user.password)) throw new Error('Mot de passe invalide');
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}


module.exports = new AuthService();


