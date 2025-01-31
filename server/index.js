import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { sequelize, User, Appointment, Service, Barber, LoyaltyPoint } from './models/index.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import authRoutes from './routes/auth.js';  // Importando as rotas
import appointmentRoutes from './routes/appointments.js';
import servicesRoutes from './routes/services.js';
import chatRoutes from './routes/chat.js';
import loyaltyRoutes from './routes/loyalty.js';
import feedbackRoutes from './routes/feedback.js';
import notificationRoutes from './routes/notifications.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import barberRoutes from './routes/barbers.js';
import promotionRoutes from './routes/promotions.js';
import rewardRoutes from './routes/rewards.js';
import adminRoutes from './routes/adminRoutes.js';  // Certifique-se de que o caminho está correto


// Configuração do express e socket.io
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",  // Frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
// Middleware JWT para Autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token do cabeçalho

  if (!token) return res.sendStatus(401); // Se não houver token, retorna erro 401

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403); // Se o token não for válido, retorna erro 403
    req.user = user; // Adiciona as informações do usuário no request
    next(); // Continua para o próximo middleware
  });
};

// Middleware para verificar se o usuário é admin
const authenticateAdmin = (req, res, next) => {
  const { role } = req.user;  // O 'role' é extraído do JWT

  if (role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  next();
};

// Usar as rotas de autenticação
app.use('/api/auth', authRoutes);  // A rota /api/auth/login será registrada automaticamente


// Roteamento das APIs
app.use('/api/appointments', authenticateToken, appointmentRoutes);  // Rota protegida
app.use('/api/services', servicesRoutes);  // Rota pública
app.use('/api/chat', authenticateToken, chatRoutes);  // Rota protegida
app.use('/api/loyalty', authenticateToken, loyaltyRoutes);  // Rota protegida
app.use('/api/feedback', authenticateToken, feedbackRoutes);  // Rota protegida
app.use('/api/notifications', authenticateToken, notificationRoutes);  // Rota protegida
app.use('/api/products', authenticateToken, productRoutes);  // Rota protegida
app.use('/api/orders', authenticateToken, orderRoutes);  // Rota protegida
app.use('/api/barbers', barberRoutes);  // Rota pública
app.use('/api/promotions', authenticateToken, promotionRoutes);  // Rota protegida
app.use('/api/rewards', authenticateToken, rewardRoutes);  // Rota protegida

// Usando o middleware de admin em rotas específicas
app.use('/api/admin', authenticateToken, authenticateAdmin, adminRoutes);  // Somente administradores

// Sincronizar o banco de dados
sequelize.sync({ force: false })
  .then(() => {
    console.log('Banco de dados sincronizado!');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });

// Conexão do Socket.IO
io.use((socket, next) => {
  // Autenticar o token enviado com a conexão do socket
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error("Authentication error"));
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) return next(new Error("Authentication error"));
    socket.user = user;  // Armazena o usuário na instância do socket
    next();
  });
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Escutando eventos de mensagens
  socket.on('send-message', async (data) => {
    try {
      const message = {
        sender_id: socket.user.id,
        receiver_id: data.receiverId,
        message: data.message,
        created_at: new Date()
      };

      // Envia a mensagem para o usuário receptor
      io.to(`user-${data.receiverId}`).emit('receive-message', {
        ...message,
        sender: socket.user  // Envia os dados do usuário remetente
      });

      // Envia uma notificação para o usuário receptor
      io.to(`user-${data.receiverId}`).emit('notification', {
        type: 'chat',
        title: 'New Message',
        message: `You have a new message from ${socket.user.name}`
      });
    } catch (error) {
      console.error('Message error:', error);
    }
  });

  // Escutando desconexões
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Inicializando o servidor
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  httpServer.close(() => {
    console.log('Server shutdown complete');
    process.exit(0);
  });
});
