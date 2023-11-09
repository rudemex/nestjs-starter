import { ConfigType } from '@nestjs/config';
import { config } from '../index';
import * as PACKAGE_JSON from '../../../package.json';
import * as process from 'process';
import { getSkipHealthChecks } from '@tresdoce-nestjs-toolkit/paas';

describe('configuration', () => {
  let appConfig: ConfigType<typeof config>;

  beforeEach(async () => {
    appConfig = config();
  });

  describe('appConfig.project', () => {
    it('should have a api-prefix', async () => {
      const { apiPrefix } = appConfig.project;

      expect(apiPrefix).toBeDefined();
      expect(apiPrefix).toEqual(expect.any(String));
      expect(apiPrefix).toEqual(process.env.API_PREFIX);
    });

    it('should have a api-prefix default', async () => {
      process.env.API_PREFIX = '';
      const { apiPrefix } = appConfig.project;

      expect(apiPrefix).toBeDefined();
      expect(apiPrefix).toEqual(expect.any(String));
      expect(apiPrefix).toEqual('TD_MY_API');
    });

    it('should have a project name', async () => {
      const { name } = appConfig.project;

      expect(name).toBeDefined();
      expect(name).toEqual(expect.any(String));
      expect(name).toEqual(PACKAGE_JSON.name);
    });

    it('should have a project version', async () => {
      const { version } = appConfig.project;

      expect(version).toBeDefined();
      expect(version).toEqual(expect.any(String));
      expect(version).toEqual(PACKAGE_JSON.version);
    });

    it('should have a project description', async () => {
      const { description } = appConfig.project;

      expect(description).toBeDefined();
      expect(description).toEqual(expect.any(String));
      expect(description).toEqual(PACKAGE_JSON.description);
    });

    it('should have a project author', async () => {
      const { author } = appConfig.project;

      expect(author).toBeDefined();
      expect(author).toEqual(expect.any(Object));
      expect(author).toEqual(PACKAGE_JSON.author);
    });

    it('should have a project repository', async () => {
      const { repository } = appConfig.project;

      expect(repository).toBeDefined();
      expect(repository).toEqual(expect.any(Object));
      expect(repository).toEqual(PACKAGE_JSON.repository);
    });

    it('should have a project bugs', async () => {
      const { bugs } = appConfig.project;

      expect(bugs).toBeDefined();
      expect(bugs).toEqual(expect.any(Object));
      expect(bugs).toEqual(PACKAGE_JSON.bugs);
    });

    it('should have a project homepage', async () => {
      const { homepage } = appConfig.project;

      expect(homepage).toBeDefined();
      expect(homepage).toEqual(expect.any(String));
      expect(homepage).toEqual(PACKAGE_JSON.homepage);
    });
  });

  describe('appConfig.server', () => {
    it('should have isProd false', async () => {
      const { isProd } = appConfig.server;

      expect(isProd).toBeDefined();
      expect(isProd).toEqual(expect.any(Boolean));
      expect(isProd).toEqual(false);
    });

    it('should have isProd true', async () => {
      process.env.NODE_ENV = 'production';
      appConfig = config();
      const { isProd } = appConfig.server;

      expect(isProd).toBeDefined();
      expect(isProd).toEqual(expect.any(Boolean));
      expect(isProd).toEqual(true);
    });

    it('should have an app stage', async () => {
      const { appStage } = appConfig.server;

      expect(appStage).toBeDefined();
      expect(appStage).toEqual(expect.any(String));
      expect(appStage).toEqual(process.env.APP_STAGE);
    });

    it('should have a PORT', async () => {
      const { port } = appConfig.server;

      expect(port).toBeDefined();
      expect(port).toEqual(expect.any(Number));
      expect(port).toEqual(parseInt(process.env.PORT, 10));
    });

    it('should return the default port when it is not defined', async () => {
      process.env.PORT = '';
      appConfig = config();
      const { port } = appConfig.server;

      expect(port).toBeDefined();
      expect(port).toEqual(expect.any(Number));
      expect(port).toEqual(parseInt('8080', 10));
    });

    it('should have a context', async () => {
      const { context } = appConfig.server;

      expect(context).toBeDefined();
      expect(context).toEqual(expect.any(String));
      expect(context).toEqual(process.env.CONTEXT);
    });

    it('should have a default context', async () => {
      process.env.CONTEXT = '';
      appConfig = config();
      const { context } = appConfig.server;

      expect(context).toBeDefined();
      expect(context).toEqual(expect.any(String));
      expect(context).toEqual('v1');
    });

    it('should have a origins', async () => {
      const { origins } = appConfig.server;

      expect(origins).toBeDefined();
      expect(origins).toEqual(expect.any(Array));
      expect(origins).toEqual(process.env.ORIGINS.split(','));
    });

    it('should have a default origins', async () => {
      process.env.ORIGINS = '';
      appConfig = config();
      const { origins } = appConfig.server;

      expect(origins).toBeDefined();
      expect(origins).toEqual('*');
    });

    it('should have a allowed headers', async () => {
      const { allowedHeaders } = appConfig.server;

      expect(allowedHeaders).toBeDefined();
      expect(allowedHeaders).toEqual(expect.any(String));
      expect(allowedHeaders).toEqual(process.env.ALLOWED_HEADERS);
    });

    it('should have a allowed methods', async () => {
      const { allowedMethods } = appConfig.server;

      expect(allowedMethods).toBeDefined();
      expect(allowedMethods).toEqual(expect.any(String));
      expect(allowedMethods).toEqual(process.env.ALLOWED_METHODS);
    });

    it('should have a propagate headers', async () => {
      const { propagateHeaders } = appConfig.server;

      expect(propagateHeaders).toBeDefined();
      expect(propagateHeaders).toEqual(expect.any(Array));
      expect(propagateHeaders).toEqual(process.env.PROPAGATE_HEADERS.split(','));
    });

    it('should have a empty propagate headers', async () => {
      process.env.PROPAGATE_HEADERS = '';
      appConfig = config();
      const { propagateHeaders } = appConfig.server;

      expect(propagateHeaders).toBeDefined();
      expect(propagateHeaders).toEqual([]);
    });

    it('should have a corsEnabled', async () => {
      const { corsEnabled } = appConfig.server;

      expect(corsEnabled).toBeDefined();
      expect(corsEnabled).toEqual(expect.any(Boolean));
      expect(corsEnabled).toBeTruthy();
    });

    it('should return false is disabled cors', async () => {
      process.env.CORS_ENABLED = 'false';
      appConfig = config();
      const { corsEnabled } = appConfig.server;

      expect(corsEnabled).toBeDefined();
      expect(corsEnabled).toEqual(expect.any(Boolean));
      expect(corsEnabled).toBeFalsy();
    });

    it('should have a corsCredentials', async () => {
      const { corsCredentials } = appConfig.server;

      expect(corsCredentials).toBeDefined();
      expect(corsCredentials).toEqual(expect.any(Boolean));
      expect(corsCredentials).toBeFalsy();
    });
  });

  describe('appConfig.health', () => {
    it('should have a skipHealthCheck', async () => {
      const { skipChecks } = appConfig.health;

      expect(skipChecks).toBeDefined();
      expect(skipChecks).toEqual(expect.any(Array));
      expect(skipChecks).toEqual(getSkipHealthChecks(process.env.SKIP_HEALTH_CHECKS));
    });

    it('should dont have a skipHealthCheck', async () => {
      process.env.SKIP_HEALTH_CHECKS = '';
      appConfig = config();
      const { skipChecks } = appConfig.health;

      expect(skipChecks).toBeDefined();
      expect(skipChecks).toEqual(expect.any(Array));
      expect(skipChecks).toEqual(getSkipHealthChecks(process.env.SKIP_HEALTH_CHECKS));
    });
  });

  describe('appConfig.swagger', () => {
    it('should have a swagger path', async () => {
      const { path } = appConfig.swagger;

      expect(path).toBeDefined();
      expect(path).toEqual(expect.any(String));
      expect(path).toEqual(process.env.SWAGGER_PATH);
    });

    it('should have a default swagger path', async () => {
      process.env.SWAGGER_PATH = '';
      appConfig = config();
      const { path } = appConfig.swagger;

      expect(path).toBeDefined();
      expect(path).toEqual(expect.any(String));
      expect(path).toEqual('docs');
    });

    it('should have a swagger disabled', async () => {
      const { enabled } = appConfig.swagger;

      expect(enabled).toBeDefined();
      expect(enabled).toEqual(expect.any(Boolean));
      expect(enabled).toBeFalsy();
    });

    it('should have a swagger enabled', async () => {
      process.env.SWAGGER_ENABLED = 'true';
      appConfig = config();
      const { enabled } = appConfig.swagger;

      expect(enabled).toBeDefined();
      expect(enabled).toEqual(expect.any(Boolean));
      expect(enabled).toBeTruthy();
    });
  });
});
