import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { LivenessController } from './controllers/liveness.controller';
import { ReadinessController } from './controllers/readiness.controller';

@Module({
  imports: [TerminusModule],
  controllers: [LivenessController, ReadinessController],
})
export class HealthModule {}
