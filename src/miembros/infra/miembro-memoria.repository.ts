import { Injectable } from "@nestjs/common";
import { Miembro } from "../dominio/entidades.js";
import { MiembrosRepository } from "../dominio/miembros.repository.js";


@Injectable()
export class MiembroMemoriaRepository implements MiembrosRepository {
  private miembros: Miembro[] = [];
  private siguienteId: number = 1;

    async crear(miembro: Miembro): Promise<Miembro> {
        const nuevoMiembro: Miembro = { ...miembro, id: this.siguienteId++ };
        this.miembros.push(nuevoMiembro);
        return nuevoMiembro;
    }

    async buscarPorId(id: number): Promise<Miembro | null> {
        return this.miembros.find((m) => m.id === id) ?? null;
    }

    async listar(): Promise<Miembro[]> {
        return [...this.miembros];
    }

    async actualizar(id: number, miembro: Partial<Miembro>): Promise<Miembro | null> {
        const indice = this.miembros.findIndex((m) => m.id === id);
        if (indice === -1) return null;
        this.miembros[indice] = { ...this.miembros[indice], ...miembro };
        return this.miembros[indice];
    }

    async eliminar(id: number): Promise<Miembro | null> {
        const indice = this.miembros.findIndex((m) => m.id === id);
        if (indice === -1) return null;
        const [miembroEliminado] = this.miembros.splice(indice, 1);
        return miembroEliminado;
    }

}