const closeDockerCompose = (_options) => {
  return async () => {
    await global.__TESTCONTAINERS__.down(_options);
    console.log('End Docker Compose');
  };
};

module.exports = closeDockerCompose({ removeVolumes: false });
