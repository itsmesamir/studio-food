import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';

import swaggerDocument from '../../swagger-output.json';

const router = Router();

router.use('/', serve);
router.get('/', setup(swaggerDocument));

export default router;
