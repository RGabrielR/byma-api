import { ConfigFactory } from '@nestjs/config';

export const appConfig: ConfigFactory = () => {
  return { URL_CEDEARS: process.env.URL_CEDEARS };
};
