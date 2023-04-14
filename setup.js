import { DockerComposeEnvironment } from 'testcontainers';

const initDockerCompose = (
  _services = [],
  _composeFilePath = '.',
  _composeFile = 'docker-compose.yml',
) => {
  return async () => {
    console.log('Init Docker Compose');
    process.env.TESTCONTAINERS_RYUK_DISABLED = 'true';
    global.__TESTCONTAINERS__ = await new DockerComposeEnvironment(
      _composeFilePath,
      _composeFile,
    ).up(_services);
  };
};

module.exports = initDockerCompose(['elasticsearch']);
