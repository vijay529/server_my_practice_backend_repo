import express from 'express';
import { getAllMemes, getSingleMeme, downloadMeme, searchMeme} from '../controllers/memes.js';

const router = express.Router();

router.post('/memes', getAllMemes);
router.get('/memes/:id', getSingleMeme);
router.get('/download', downloadMeme);
router.post('/search', searchMeme);

export default router;