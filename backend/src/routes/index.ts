import {Router} from 'express';
import confession from './confession.routes';
import threads from './threads.routes';

const router = Router();

router.use('/confessions', confession);
router.use('/threads', threads);

export default router;
