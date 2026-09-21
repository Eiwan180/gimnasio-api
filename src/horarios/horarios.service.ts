import { Inject, Injectable } from '@nestjs/common';
import { Horario } from './dominio/entidades.js';
import type { HorariosRepository } from './dominio/horarios.repository.js';
import { CrearHorarioDto } from './dto/crear-horario.dto.js';
import { ActualizarHorarioDto } from './dto/editar-horario.dto.js';
import { HORARIO_REPOSITORY } from './horarios-token.js';

@Injectable()
export class HorariosService {
    constructor(
    @Inject(HORARIO_REPOSITORY) private readonly repo: HorariosRepository,
  ) {}

  listar(): Promise<Horario[]> {
    return this.repo.listar();
  }

  buscar(id: number): Promise<Horario | null> {
    return this.repo.buscarPorId(id);
  }

  crear(dto: CrearHorarioDto): Promise<Horario> {
    return this.repo.crear(dto as Horario);
  }

  actualizar(id: number, dto: ActualizarHorarioDto): Promise<Horario | null> {
    return this.repo.actualizar(id, dto);
  }

  eliminar(id: number): Promise<Horario | null> {
    return this.repo.eliminar(id);
  }
}
