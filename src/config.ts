import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    testEnv: process.env.TEST_KEY,
    services: {
      rickAndMortyAPI: process.env.RICK_AND_MORTY_API,
    },
  };
});
