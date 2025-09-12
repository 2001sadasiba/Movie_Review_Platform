import express from 'express';
import { MovieController } from '../controllers';
import { authMiddleware } from '../middleware';

const router = express.Router();
const movieController = MovieController.getInstance(); 

/**
 * @route   GET /api/v1/movies/search
 * @desc    Search for movies by title using the OMDB API
 * @access  Public
 * @param   {string} q - Search query (movie title)
 */
router.get('/search', authMiddleware, movieController.searchMovies.bind(movieController));

/**
 * @route   GET /api/movies/:imdbId
 * @desc    Get full details for a specific movie by its IMDB ID.
 *          Fetches details from OMDB and reviews from our database.
 * @access  Public
 * @param   {string} imdbId - The IMDB ID of the movie (e.g., tt1375666)
 */
router.get('/:imdbId', authMiddleware, movieController.getMovieById.bind(movieController));

export default router;