import { Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Post, Delete} from '@nestjs/common';
import { ClasesService } from './clases.service.js';
import type { CrearClaseDto } from './dto/crear-clase.dto.js';
import type { ActualizarClaseDto } from './dto/editar-clase.dto.js';


@Controller('clases')
export class ClasesController {
  constructor(private readonly clasesService: ClasesService) {}

  @Get()
  listar() {
    return this.clasesService.listar();
  }

  @Post()
  @HttpCode(201)
  crear(@Body() cuerpo: CrearClaseDto) {
    return this.clasesService.crear(cuerpo);
  }

  @Patch(':id')
  async actualizar(@Param('id') id: string, @Body() dto : ActualizarClaseDto) {
    const clase = await this.clasesService.actualizar(Number(id), dto);
    if (!clase) {
      throw new NotFoundException(`No existe la clase para actualizar`);
    }
    return clase;
  }

  @Delete(':id')
  async eliminar(@Param('id') id: string) {
    const clase = this.clasesService.eliminar(Number(id));
    if (!clase) {
      throw new NotFoundException(`No existe la clase`);
    }
    return clase;
  }
}
