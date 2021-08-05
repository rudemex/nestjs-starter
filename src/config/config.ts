import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: parseInt(process.env.PORT, 10),
    testEnv: process.env.TEST_KEY,
    services: {
      rickAndMortyAPI: process.env.RICK_AND_MORTY_API_URL,
    },
  };
});
