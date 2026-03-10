import app from '@/app';
import { env } from '@/config/env';

app.listen(env.PORT, () => {
  // eslint-disable-next-line no-console, @typescript-eslint/restrict-template-expressions
  console.log(`Server running on http://localhost:${env.PORT}`);
});
