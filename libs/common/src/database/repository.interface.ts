export const REPOSITORY = "REPOSITORY"

export interface IRepository<T> {
    create(data: Omit<T, '_id'>): Promise<T>
    update(filters: Partial<T>, data: Partial<T>): Promise<T>
    findById?(id: number | string): Promise<T>
    findMany?(filters?: Partial<T>, page?: number): Promise<T[]>
    findOneWhere?(filters?: Partial<T>): Promise<T>
    delete?(filters?: Partial<T>): Promise<T>
}