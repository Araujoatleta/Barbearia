import express from 'express';
import bcrypt from 'bcrypt';  // Para criptografar a senha
import User from '../models/User.js';  // Importando o modelo User
import jwt from 'jsonwebtoken';

const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Gerar um token JWT
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

    res.json({
      message: "Login successful",
      token,  // Envia o token para o frontend
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {

  try {
    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,  // Senha criptografada
      role: role || 'user',  // Se não houver role, atribui 'user' por padrão
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      }
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: "Internal server error" });
  }
});
});
export default router;
