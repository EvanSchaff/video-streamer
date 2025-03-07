import { Router } from 'express';
import { authenticateKey, updateEndStream } from '../../controllers/nginxController';
import { ipFilter } from '../../middlewares/ipFilterMiddleware';

const router = Router();

router.post('/auth', ipFilter, authenticateKey);
router.post('/end', ipFilter, updateEndStream);

export default router;