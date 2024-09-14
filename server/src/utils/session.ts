import { Any } from '@/types/common';

import config from '@/config';

export function updateSessions(res: Any, data: Any): void {
  res.cookie('accessToken', data.accessToken, config.cookie.options);
  res.cookie('refreshToken', data.refreshToken, config.cookie.options);

  return;
}
