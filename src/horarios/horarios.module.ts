import { Module } from '@nestjs/common';
import { HorariosService } from './horarios.service.js';
import { HorariosController } from './horarios.controller.js';
import { HORARIO_REPOSITORY } from './horarios-token.js';
import { HorarioMemoriaRepository } from './infra/horario-memoria.repository.js';

@Module({
  controllers: [HorariosController],
  providers: [HorariosService,
    {
      provide: HORARIO_REPOSITORY,
      useClass: HorarioMemoriaRepository,
    }
  ],
})
export class HorariosModule {}
