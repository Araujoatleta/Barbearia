import express from 'express';
import { User, Appointment, Service } from '../models/index.js'; // Certifique-se de que esses modelos existem e estão sendo exportados corretamente

const router = express.Router();

// Rota para obter todos os usuários (apenas admin)
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll(); // Obtém todos os usuários do banco de dados
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Erro ao buscar usuários.' });
  }
});

// Rota para visualizar todos os agendamentos (apenas admin)
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.findAll(); // Obtém todos os agendamentos
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Erro ao buscar agendamentos.' });
  }
});

// Rota para criar um novo serviço (apenas admin)
router.post('/services', async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Nome, descrição e preço são obrigatórios.' });
  }

  try {
    const newService = await Service.create({
      name,
      description,
      price
    });
    res.status(201).json(newService); // Retorna o serviço recém-criado
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Erro ao criar serviço.' });
  }
});

// Rota para excluir um serviço (apenas admin)
router.delete('/services/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado.' });
    }

    await service.destroy(); // Deleta o serviço
    res.status(200).json({ message: 'Serviço excluído com sucesso.' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Erro ao excluir serviço.' });
  }
});

// Rota para visualizar um agendamento específico (apenas admin)
router.get('/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    res.json(appointment); // Retorna o agendamento encontrado
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({ message: 'Erro ao buscar agendamento.' });
  }
});

// Exemplo de atualização de status de um agendamento (apenas admin)
router.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const appointment = await Appointment.findByPk(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Agendamento não encontrado.' });
    }

    // Atualiza o status do agendamento
    appointment.status = status || appointment.status;
    await appointment.save();

    res.json(appointment); // Retorna o agendamento atualizado
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Erro ao atualizar agendamento.' });
  }
});

export default router;
