import { getEnvFilePath, loadEnvFile } from '../environments.js';

describe('environments', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    vi.restoreAllMocks();
  });

  it('should return the env file of the current environment', () => {
    process.env.NODE_ENV = 'dev';
    expect(getEnvFilePath()).toBe('.env.dev');
  });

  it('should load the env file of the current environment', () => {
    const loadSpy = vi.spyOn(process, 'loadEnvFile').mockImplementation(() => undefined);

    loadEnvFile();

    expect(loadSpy).toHaveBeenCalledWith('.env.test');
  });

  it('should not load any file in production', () => {
    process.env.NODE_ENV = 'production';
    const loadSpy = vi.spyOn(process, 'loadEnvFile').mockImplementation(() => undefined);

    loadEnvFile();

    expect(loadSpy).not.toHaveBeenCalled();
  });

  it('should not load any file for an unknown environment', () => {
    process.env.NODE_ENV = 'unknown';
    const loadSpy = vi.spyOn(process, 'loadEnvFile').mockImplementation(() => undefined);

    loadEnvFile();

    expect(loadSpy).not.toHaveBeenCalled();
  });

  it('should not fail when the env file does not exist', () => {
    process.env.NODE_ENV = 'stg'; // the starter has no .env.stg
    const loadSpy = vi.spyOn(process, 'loadEnvFile').mockImplementation(() => undefined);

    loadEnvFile();

    expect(loadSpy).not.toHaveBeenCalled();
  });
});
