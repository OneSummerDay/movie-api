import express from 'express';

const router = express.Router();

router.get('/movies', (req, res) => {
    res.json({ message: 'List of movies' });
})

router.get('/movies', (req, res) => {
    res.json({ message: 'List of movies' });
})

router.post('/movies', (req, res) => {
    res.json({ message: 'List of movies' });
})

router.put('/movies', (req, res) => {
    res.json({ message: 'List of movies' });
})

router.delete('/movies', (req, res) => {
    res.json({ message: 'List of movies' });
})


export default router;

