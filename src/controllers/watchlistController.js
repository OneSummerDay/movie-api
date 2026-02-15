import { prisma } from "../config/db.js";

const addToWatchList = (req, res) => {
    const { movieId, status, rating, notes} = req.body;

    const movie = prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    const existingInWatchList =  prisma.watchlistItem.findUnique({
        where: { userId_movieId: {
            userId: userId,
            movieId: movieId,
        }}
    });

    if (existingInWatchList) {
        return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    const watchlistItem = prisma.watchlistItem.create({
        data: {
            userId,
            movieId,
            status: status || 'Plan to Watch',
            rating,
            notes,
        }
    });

    res.status(201).json(watchlistItem);

};

export { addToWatchList };