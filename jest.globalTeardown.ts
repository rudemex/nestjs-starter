import { closeDockerCompose } from '@tresdoce-nestjs-toolkit/test-utils';

module.exports = closeDockerCompose({ removeVolumes: true });
