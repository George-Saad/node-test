import { createMovie, deleteMovie, getMovie, getMovies } from "../controllers/movies.js";
import express from "express";

const router = express.Router();

router.get('/:id', getMovie);

router.get('/', getMovies);

router.post('/', createMovie);

router.delete('/:id', deleteMovie);

export default router;