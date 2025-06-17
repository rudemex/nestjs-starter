import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth, NoAuth } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private readonly logger = new Logger(WhatsappService.name);
  private client: Client;

  onModuleInit() {
    this.client = new Client({
      authStrategy: new NoAuth()
      /*authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },*/
    });

    this.client.on('qr', (qr) => {
      this.logger.log('Escaneá el siguiente QR para iniciar sesión:');
      qrcode.generate(qr, { small: true });
    });

    this.client.on('ready', () => {
      this.logger.log('WhatsApp conectado ✅');
    });

    this.client.on('message', async (message) => {
      this.logger.log(`Mensaje de ${message.from}: ${message.body}`);
      if (message.body.toLowerCase() === 'ping') {
        await message.reply('pong');
      }
    });

    this.client.initialize();
  }

  sendMessage(to: string, message: string) {
    return this.client.sendMessage(to, message);
  }
}
