import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { PaginateResult } from 'mongoose';

import { IClient } from './clients.interface';
import { ClientsService } from './clients.service';

@Controller('api/v1/clients')
export class ClientsController {
  constructor(private clientService: ClientsService) {}

  @Post()
  async create(@Body() client: IClient): Promise<IClient> {
    if (client.nome.length < 10) {
      throw new BadRequestException('o nome deve ter mais de 10 caracteres !');
    }

    return this.clientService.create(client);
  }

  @Get()
  async getAll(
    @Request() req,
    @Query() query,
  ): Promise<PaginateResult<IClient>> {
    const { page = 1, limit = 5 } = query;
    return this.clientService.getAll(req.filters, page, limit);
  }

  @Get(':id')
  async getBYId(@Param('id') id: string): Promise<IClient> {
    return this.clientService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() client: IClient,
  ): Promise<IClient> {
    return this.clientService.udpate(id, client);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    this.clientService.delete(id);
  }
}
