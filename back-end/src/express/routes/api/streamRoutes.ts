import { Router } from 'express';
import { startStream, endStream } from '../../controllers/streamController';

const router = Router();


router.post('/start', startStream);
router.post('/end', endStream);

export default router;