import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });

        if (!user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(401).json({ message: 'Invalid token, authorization denied' });
    }
};

export default authMiddleware;