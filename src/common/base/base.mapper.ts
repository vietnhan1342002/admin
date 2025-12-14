import { IBaseMapper } from 'src/interfaces/IMapper';

export abstract class BaseMapper<Entity, ResponseDto>
  implements IBaseMapper<Entity, ResponseDto>
{
  abstract toResponse(entity: Entity): ResponseDto;

  toListResponse(entities: Entity[]): ResponseDto[] {
    return entities.map((e) => this.toResponse(e));
  }
}
