export const SERVICE = 'SERVICE'

export interface IService<Model, CreateDto, UpdateDto> {
    create?(createDto: CreateDto): Promise<Model>
    findAll?(): Promise<Model>[]
    findOne?(id: string): Promise<Model>
    update?(_id: string, updateDto: UpdateDto): Promise<Model>
    remove?(_id: string): Promise<Model>
}