import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { Database } from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { routes } from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize database
Database.initialize();

// Middleware
app.use(helmet());
app.use(cors({
  origin: '*', // Allow all origins for development purposes
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'University Hub API is running' });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 University Hub API ready at http://localhost:${PORT}`);
});