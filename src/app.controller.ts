import { Controller, Get, HttpException, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { SkipTrace } from '@tresdoce-nestjs-toolkit/tracing';
import { Ctx, Payload } from '@nestjs/microservices';
import { HttpClientService } from '@tresdoce-nestjs-toolkit/http-client';
import {
  Subscription,
  HandleFailureOptions,
  Task,
  TaskService,
  Variables,
} from '@tresdoce-nestjs-toolkit/camunda';
import { config } from './config';
import { ConfigType } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    @Inject(config.KEY) private readonly appConfig: ConfigType<typeof config>,
    private readonly appService: AppService,
    private readonly httpClient: HttpClientService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('test-env')
  async getTestEnv(): Promise<string> {
    return this.appService.getTestEnv();
  }

  @Get('my-util')
  @SkipTrace()
  getMyUtil() {
    return this.appService.getMyCustomUtil();
  }

  // ========================
  // Lanzar instancia por API
  // ========================
  @Get('create-user')
  async createUser() {
    try {
      // Seteamos las variables para lanzar el proceso BPMN
      const dataInstance = {
        variables: {
          username: { value: 'juan' },
          email: { value: 'juan@email.com' },
        },
      };

      // Hacemos un post a la API de Camunda para iniciar el proceso de BPMN
      const { data } = await this.httpClient.post(
        encodeURI(`${this.appConfig.camunda.baseUrl}/process-definition/key/create-user/start`),
        {
          data: dataInstance,
        },
      );

      return data;
    } catch (error) {
      throw new HttpException(error.message, error.response.status);
    }
  }

  // ==================================================
  // Subscripcion al evento de guardar en base de datos
  // ==================================================
  @Subscription('save-database')
  async saveDatabase(@Payload() task: Task, @Ctx() taskService: TaskService) {
    try {
      const processVariables = new Variables();
      const username = task.variables.get('username');
      const email = task.variables.get('email');

      console.log(`Username: ${username}`);
      console.log(`Email: ${email}`);

      processVariables.set('isSaved', username === 'juan');

      /*
       * Aca estaría el código para guardar en la BD
       */

      await taskService.complete(task, processVariables);
      console.log(`completed task ${task.id}`, 'Camunda');
    } catch (error) {
      const options: HandleFailureOptions = {
        errorMessage: error.message,
      };
      await taskService.handleFailure(task, options);
      console.error(error);
    }
  }

  // ============================================
  // Subscripcion para el evento de envio de mail
  // ============================================
  @Subscription('send-email')
  async sendEmail(@Payload() task: Task, @Ctx() taskService: TaskService) {
    try {
      console.log(task.variables.getAll());
      const username = task.variables.get('username');
      const email = task.variables.get('email');

      console.log(`Username: ${username}`);
      console.log(`Email: ${email}`);

      /*
       * Aca estaría el código para enviar un mail
       */

      await taskService.complete(task);
      console.log(`completed task ${task.id}`, 'Camunda');
    } catch (error) {
      const options: HandleFailureOptions = {
        errorMessage: error.message,
      };
      await taskService.handleFailure(task, options);
      console.error(error);
    }
  }
}
