import { Controller, Get, Param, NotFoundException, Post, HttpCode, Body, Res, BadRequestException, Put, Delete } from "@nestjs/common";
import type { CrearMiembroDto } from "./dto/crear-miembros.dto.js";
import type { ActualizarMiembroDto } from "./dto/editar-miembros.dto.js";
import { MiembrosService } from "./miembros.service.js";
import type { Response } from "express";

@Controller('miembros')
export class MiembrosController {
    constructor(private readonly servicio: MiembrosService) {}

    @Get()
    async listar() {
        const lista = await this.servicio.listar();
        return lista;
    }

    @Get(':id')
    async buscar(@Param('id') id: string) {
        const miembro = await this.servicio.buscar(Number(id));
        if (!miembro) {
            throw new NotFoundException(`No existe el miembro con id ${id}`);
        }
        return miembro; 
    }

    @Post()
    @HttpCode(201)
    async crear(@Body() dto: CrearMiembroDto, @Res({ passthrough: true }) res: Response) {
        if (!dto?.nombre || !dto?.correo || !dto?.membresia) {
            throw new BadRequestException('Los campos nombre, correo y membresia son obligatorios');
        }

        try {
            const miembro = await this.servicio.crear(dto);
            res.setHeader('Location', `/miembros/${miembro.id}`);
            return miembro; 
        } catch (error: any) {
            if (error.message && error.message.includes('en uso')) {
                throw new BadRequestException(error.message);
            }
            throw error;
        }
    }

    @Put(':id') 
    async actualizar(@Param('id') id: string, @Body() dto: ActualizarMiembroDto) {
        const actualizado = await this.servicio.actualizar(Number(id), dto);
        if (!actualizado) {
            throw new NotFoundException(`No existe el miembro con id ${id}`);
        }
        return actualizado;
    }

    @Delete(':id')
    async eliminar(@Param('id') id: string) {
        const eliminado = await this.servicio.eliminar(Number(id));
        if (!eliminado) {
            throw new NotFoundException(`No existe el miembro con id ${id}`);
        }
        return eliminado; 
    }
}