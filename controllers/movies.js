import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';

let movies = [
  {
    id: "1",
    title: 'inception',
    director: 'Christofer Nolan',
    // the date format is YYYY-MM-DD
    release_date: '2010-07-16'
  },
  {
      id: "2",
      title: 'The Irishman',
      director: 'Martin Scorcesy',
      release_date: '2019-09-27'
  }
];

export function getMovie(req, res){
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id == id);
  if(!movie) return res.status(404).json({ message: "No movie with that ID: " + id + " exists" });
  
  res.status(200).json(movie);
}

export function getMovies(req, res) {
  res.status(200).json(movies);
}

export function createMovie(req, res) {

  const movie = req.body;
  const { error } = validateMovie(movie);
  if(error) return res.status(400).json( { message: error.details[0].message });
  // using uuid package for generating unique IDs
  movie.id = uuidv4();
  movies.push(movie);
  res.status(201).json(movie);
}

export function deleteMovie(req, res) {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id == id);
  if(!movie) return res.status(404).json({ message: "No movie with that ID: " + id + " exists" });

  const index = movies.indexOf(movie);
  movies.splice(index, 1); 
  
  res.status(200).json({ message: "Movie with ID: " + id + " has been deleted" });
}

// use Joi to validate movie input
function validateMovie(movie) {
  
  const schema = Joi.object({
    title: Joi.string().min(2).required(),
    director: Joi.string().min(2).required(),
    release_date: Joi.date().less('now').required()
  });

  return schema.validate(movie);
}