import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

const creatorId = "clh9g5l8o0000qz6j1v7m9s2"; // Replace with your actual creator ID

const movies = [
    {
        title: 'Inception',
        overview: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        releaseYear: new Date('2010-07-16'),
        genre: 'Sci-Fi',
        runtime: 148,
        posterUrl: 'https://example.com/inception.jpg',
        creatorId: creatorId,
    },
    {
        title: 'The Matrix',
        overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        releaseYear: new Date('1999-03-31'),
        genre: 'Action',
        runtime: 136,
        posterUrl: 'https://example.com/matrix.jpg',
        creatorId: creatorId,
    },
    {
        title: 'Interstellar',
        overview: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
        releaseYear: new Date('2014-11-07'),
        genre: 'Adventure',
        runtime: 169,
        posterUrl: 'https://example.com/interstellar.jpg',
        creatorId: creatorId,
    },
];

const main = async () => {
    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
    }
    console.log('Movies seeded successfully!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });