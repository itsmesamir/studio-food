import { Router } from 'express';

import swaggerRoute from '@/modules/swagger/swagger.route';
import usersRoute from '@/modules/user/user.route';

import { addToStore } from '@/services/store';

import config from 'config';
import { X_REQUEST_ID, X_TRACE_ID } from 'constants/headers';
import authMiddleware, { requireAuth } from 'middlewares/auth';

const router = Router();

router.get('/', (req, res) => {
  res.cookie('cookieName', 'cookieValue', { httpOnly: false });

  res.json({
    app: config.app.name,
    version: config.app.version,
  });
});

// Add request id and trace id to store.
router.use((req, _, next) => {
  if (req.headers[X_REQUEST_ID]) {
    addToStore({ [X_REQUEST_ID]: req.headers[X_REQUEST_ID] });
  }

  if (req.headers[X_TRACE_ID]) {
    addToStore({ [X_TRACE_ID]: req.headers[X_TRACE_ID] });
  }

  next();
});

router.use(authMiddleware);

router.use('/users', usersRoute);

router.use(requireAuth);
router.use('/api-docs', swaggerRoute);

export default router;
