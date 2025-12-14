export interface IBaseMapper<Entity, ResponseDto> {
  toResponse(entity: Entity): ResponseDto;
  toListResponse(entities: Entity[]): ResponseDto[];
}
