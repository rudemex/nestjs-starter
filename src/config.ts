import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  testEnv: process.env.TEST_KEY,
  services: {
    rickAndMortyAPI: process.env.RICK_AND_MORTY_API_URL,
  },
}));
