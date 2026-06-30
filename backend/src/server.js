import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import pantryRoutes from './routes/pantryRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/check-pantry', pantryRoutes);

app.get('/', (req, res) => {
  res.send('Elric AI Backend is running!');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});
