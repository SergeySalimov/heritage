import { Controller, Get, Res } from '@nestjs/common';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  root(@Res() response): void {
    response.sendFile(path.resolve('./public/index.html'));
  }
}
