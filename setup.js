import { DockerComposeEnvironment } from 'testcontainers';

const initDockerCompose = (
  _services = [],
  _composeFilePath = '.',
  _composeFile = 'docker-compose.yml',
) => {
  return async () => {
    console.log(`Init services from docker-compose: ${_services.join(', ')}`);
    global.__TESTCONTAINERS__ = await new DockerComposeEnvironment(
      _composeFilePath,
      _composeFile,
    ).up(_services);
  };
};

module.exports = initDockerCompose([
  'elasticsearch',
  'postgres',
  'mysql',
  'mongo',
  'redis',
  'camunda',
]);
