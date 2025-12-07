import { app } from './app';
import { PORT } from './env.config';

const USED_PORT = PORT || 3000;

app.listen(USED_PORT, async () => {
  console.log(`Server is running on port ${USED_PORT}`);
});
