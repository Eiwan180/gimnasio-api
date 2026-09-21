import { Miembro } from '../dominio/entidades.js';

export interface MiembrosRepository {
  crear(miembro: Miembro): Promise<Miembro>;
  buscarPorId(id: number): Promise<Miembro | null>;
  listar(): Promise<Miembro[]>;
  actualizar(id: number, miembro: Partial<Miembro>): Promise<Miembro | null>;
  eliminar(id: number): Promise<Miembro | null>;
}