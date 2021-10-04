import movieRouter from "../routes/movies.js";
import request from "supertest";
import express, { json } from 'express'
import e from "express";

const app = express();
app.use(express.json());
app.use('/movies', movieRouter);

describe("GET /movies", () => {
  
  it('Returns all movie from database -there are two movies in the when starting the server-', async () => {
    const response = await request(app).get('/movies');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(2);
  });

});

describe("GET /movies/:id", () => {
  
  describe("Request a movie with existing id", () => {
    it('Returns a movie with the given id', async () => {
      const response = await request(app).get('/movies/1');
      expect(response.statusCode).toBe(200);
      expect(response.body.id).toEqual("1");
    });
  });

  describe("Request a movie with unexisting id", () => {
    it('Returns -No movie with that ID: exists-', async () => {
      const response = await request(app).get('/movies/5');
      expect(response.statusCode).toBe(404);
    });
  });

});

describe("POST /movies", () => {
  
  describe("When sending a valid title, director and release_date", () => {
    it('Request a new movie with its properties', async () => {
      const response = await request(app).post('/movies').send({ 
        title: "new movie",
        director: "new director",
        release_date: "1994-07-07" 
      });
      expect(response.statusCode).toBe(201);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("When the title is missing", () => {
    it('Returns -"title" is required-', async () => {
      const response = await request(app).post('/movies').send({
        director: "new director",
        release_date: "1994-07-07" 
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toContain('title');
      expect(response.body.message).toContain('required');
    });
  });

  describe("When the director is missing", () => {
    it('Returns -"director" is required-', async () => {
      const response = await request(app).post('/movies').send({
        title: "new title",
        release_date: "1994-07-07" 
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toContain('director');
      expect(response.body.message).toContain('required');
    });
  });

  describe("When the release_date is missing", () => {
    it('Returns -"release_date" is required-', async () => {
      const response = await request(app).post('/movies').send({
        director: "new director",
        title: "new title" 
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toContain('release_date');
      expect(response.body.message).toContain('required');
    });
  });

  describe("When the id is given", () => {
    it('Returns -"title" is required-', async () => {
      const response = await request(app).post('/movies').send({
        id: "123",
        title: "new movie",
        director: "new director",
        release_date: "1994-07-07" 
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toContain('id');
      expect(response.body.message).toContain('not allowed');
    });
  });

  describe("When the date format is invalid", () => {
    it('Returns -"release_date" must be a valid date-', async () => {
      const response = await request(app).post('/movies').send({
        title: "new movie",
        director: "new director",
        release_date: "1994-17-17" 
      });
      expect(response.statusCode).toBe(400);
      expect(response.body.message).toContain('release_date');
      expect(response.body.message).toContain('must be a valid date');
    });
  });

});


describe("DELETE /movies/:id", () => {
  
  describe("Delete a movie with existing id", () => {
    it('Returns a movie with the given id', async () => {
      const response = await request(app).delete('/movies/1');
      expect(response.statusCode).toBe(200);
    });
  });

  describe("Delete a movie with unexisting id", () => {
    it('Returns -No movie with that ID: exists-', async () => {
      const response = await request(app).get('/movies/5');
      expect(response.statusCode).toBe(404);
    });
  });

});