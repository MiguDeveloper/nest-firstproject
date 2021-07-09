import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  @Cron(CronExpression.EVERY_2ND_HOUR)
  showEveryFiveMinutes() {
    this.logger.debug('Este mensaje se muestra cada 5seg');
  }
}
