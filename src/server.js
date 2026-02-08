import express from 'express';

// Import routes
import movieRoutes from './routes/movieRoutes.js';

const app = express();

// API routes
app.use('/movies', movieRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});