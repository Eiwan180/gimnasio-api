import { Injectable } from '@nestjs/common';
import { Horario } from '../dominio/entidades.js';
import type { HorariosRepository } from '../dominio/horarios.repository.js';

@Injectable()
export class HorarioMemoriaRepository implements HorariosRepository {
  private horarios: Horario[] = [
    { id: 1, claseId: 1, dia: 'Lunes', horaInicio: '08:00', cupoMaximo: 20, entrenador: 'Carlos' },
    { id: 2, claseId: 1, dia: 'Miércoles', horaInicio: '10:00', cupoMaximo: 15, entrenador: 'Ana' },
    { id: 3, claseId: 2, dia: 'Viernes', horaInicio: '18:00', cupoMaximo: 25, entrenador: 'Luis' },
  ];
  private siguienteId = 4;

  async crear(horario: Horario): Promise<Horario> {
    const nuevoHorario: Horario = { ...horario, id: this.siguienteId++ };
    this.horarios.push(nuevoHorario);
    return nuevoHorario;
  }

  async buscarPorId(id: number): Promise<Horario | null> {
    return this.horarios.find((h) => h.id === id) ?? null;
  }

  async listar(): Promise<Horario[]> {
    return [...this.horarios];
  }

  async actualizar(id: number, horario: Partial<Horario>): Promise<Horario | null> {
    const indice = this.horarios.findIndex((h) => h.id === id);
    if (indice === -1) return null;
    this.horarios[indice] = { ...this.horarios[indice], ...horario };
    return this.horarios[indice];
  }

  async eliminar(id: number): Promise<Horario | null> {
    const indice = this.horarios.findIndex((h) => h.id === id);
    if (indice === -1) return null;
    const [eliminado] = this.horarios.splice(indice, 1);
    return eliminado;
  }
}