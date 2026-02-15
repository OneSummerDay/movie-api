import express from "express";
import { addToWatchList } from "../controllers/watchlistController.js";
import authMiddleware from "../middlewares/authMiddlewar.js";

const router = express.Router();

router.use(authMiddleware);

router.post('/', addToWatchList);
router.delete('/:movieID', removeFromWatchList);


export default router;