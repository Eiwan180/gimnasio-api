import { Controller, Get, Param, NotFoundException, Delete, Post, Body, BadRequestException, HttpCode, Res, Put } from '@nestjs/common';
import type { Response } from 'express';
import { HorariosService } from './horarios.service.js';
import type { CrearHorarioDto } from './dto/crear-horario.dto.js';
import type { ActualizarHorarioDto } from './dto/editar-horario.dto.js';

@Controller('horarios')
export class HorariosController {
  constructor(private readonly servicio: HorariosService) {}

  @Get()
  async listar() {
    return await this.servicio.listar();
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const horario = await this.servicio.buscar(Number(id));
    if (!horario) {
      throw new NotFoundException(`No existe el horario`);
    }
    return horario;
  }

  @Post()
  @HttpCode(201)
  async crear(@Body() dto: CrearHorarioDto, @Res({ passthrough: true }) res: Response) {
    if (!Number.isInteger(dto?.claseId) || !dto?.dia || !dto?.horaInicio || !Number.isInteger(dto?.cupoMaximo) || !dto?.entrenador) {
      throw new BadRequestException('Todos los campos son obligatorios y deben ser validos');
    }

    const horario = await this.servicio.crear(dto);
    res.setHeader('Location', `/horarios/${horario.id}`);
    return horario;
  }

  @Put(':id')
  async actualizar(@Param('id') id: string, @Body() dto: ActualizarHorarioDto) {
    const actualizado = await this.servicio.actualizar(Number(id), dto);
    if (!actualizado) {
      throw new NotFoundException(`No existe el horario`);
    }
    return actualizado;
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const eliminado = await this.servicio.eliminar(Number(id));
    if (!eliminado) {
      throw new NotFoundException(`No existe el horario`);
    }
    return eliminado;
  }
}
