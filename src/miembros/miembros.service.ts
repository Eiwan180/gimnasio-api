import { Inject, Injectable } from '@nestjs/common';
import { Miembro } from './dominio/entidades.js';
import type { MiembrosRepository } from './dominio/miembros.repository.js';
import { CrearMiembroDto } from './dto/crear-miembros.dto.js';
import { ActualizarMiembroDto } from './dto/editar-miembros.dto.js';

@Injectable()
export class MiembrosService {
    constructor(@Inject('MIEMBRO_REPOSITORY') private readonly repo: MiembrosRepository) {}

    listar(): Promise<Miembro[]> {
        return this.repo.listar();
    }

    buscar(id: number): Promise<Miembro | null> {
        return this.repo.buscarPorId(id);
    }

    crear(dto: CrearMiembroDto): Promise<Miembro> {
        return this.repo.crear(dto as Miembro);
    }
    
    actualizar(id: number, dto: ActualizarMiembroDto): Promise<Miembro | null> {
        return this.repo.actualizar(id, dto);
    }
    
    eliminar(id: number): Promise<Miembro | null> {
        return this.repo.eliminar(id);
    }

}
