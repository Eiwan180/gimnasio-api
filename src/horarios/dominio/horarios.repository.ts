import { Horario } from './entidades.js';

export interface HorariosRepository {
  crear(horario: Horario): Promise<Horario>;
  buscarPorId(id: number): Promise<Horario | null>;
  listar(): Promise<Horario[]>;
  actualizar(id: number, horario: Partial<Horario>): Promise<Horario | null>;
  eliminar(id: number): Promise<Horario | null>;
}