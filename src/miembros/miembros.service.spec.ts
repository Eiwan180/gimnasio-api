import { ConflictException, Injectable, Inject } from "@nestjs/common";
import { Miembro } from "./dominio/entidades.js";
import type { MiembrosRepository } from "./dominio/miembros.repository.js";
import { CrearMiembroDto } from "./dto/crear-miembros.dto.js";
import { ActualizarMiembroDto } from "./dto/editar-miembros.dto.js";
import { MIEMBRO_REPOSITORY } from "./miembros-token.js";

@Injectable()
export class MiembrosService {
  constructor(
    @Inject(MIEMBRO_REPOSITORY) private readonly repo: MiembrosRepository,
  ) {}

  listar(): Promise<Miembro[]> {
    return this.repo.listar();
  }

  buscar(id: number): Promise<Miembro | null> {
    return this.repo.buscarPorId(id);
  }

  async crear(dto: CrearMiembroDto): Promise<Miembro> {
      const miembrosActuales = await this.repo.listar();
      const correoYaExiste = miembrosActuales.some((m) => m.correo === dto.correo);

      if (correoYaExiste) {
        throw new ConflictException(`El correo ${dto.correo} ya está en uso.`);

      }

      return this.repo.crear({...dto, activo: true,} as Miembro);
    }

  actualizar(id: number, dto: ActualizarMiembroDto): Promise<Miembro | null> {
    return this.repo.actualizar(id, dto);
  }

  eliminar(id: number): Promise<Miembro | null> {
    return this.repo.eliminar(id);
  }
}
