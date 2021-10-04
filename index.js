import express from 'express';
import moviesRoutes from './routes/movies.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/movies', moviesRoutes);

app.listen(port, () => {
  console.log('Server listen on port ', port);
});