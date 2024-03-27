export interface IRepository<T> {
    create(data: any): Promise<T>
    update(filters: any, data: any): Promise<T>
    findById?(id: any): Promise<T>
    findMany?(filters?: any, page?: number): Promise<T[]>
    findOneWhere?(filters?: any): Promise<T>
}