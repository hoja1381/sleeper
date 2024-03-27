import { Logger, NotFoundException } from "@nestjs/common";
import { AbstractEntity } from "./abstract.entity";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { IRepository } from "./repository.interface";


export class AbstractRepository<TEntity extends AbstractEntity> implements IRepository<TEntity>{
    protected readonly logger = Logger

    constructor(protected readonly model: Model<TEntity>) { }


    async create(data: Omit<TEntity, '_id'>): Promise<TEntity> {
        const createdDoc = new this.model({
            _id: new Types.ObjectId,
            ...data,
        })

        const savedDoc = (await createdDoc.save()).toJSON()
        return savedDoc as unknown as TEntity
    }


    async update(filters: FilterQuery<TEntity>, data: UpdateQuery<TEntity>): Promise<TEntity> {
        const updatedDoc = await this.model.findOneAndUpdate(filters, data, { new: true })

        if (!updatedDoc) {
            this.logger.warn(`document not found with ${filters}`)
            throw new NotFoundException(`document not found with ${filters}`)
        }

        return updatedDoc
    }


    async findById?(id: string): Promise<TEntity> {
        const foundDoc = await this.model.findById(id)

        if (!foundDoc) {
            this.logger.warn(`document not found with ${id}`)
            throw new NotFoundException(`document not found with ${id}`)
        }

        return foundDoc

    }


    async findMany?(filters?: FilterQuery<TEntity>): Promise<TEntity[]> {
        const foundDocs = await this.model.find(filters)

        return foundDocs
    }


    async findOneWhere?(filters?: FilterQuery<TEntity>): Promise<TEntity> {
        const foundDoc = await this.model.findOne(filters)

        if (!foundDoc) {
            this.logger.warn(`document not found with ${filters}`)
            throw new NotFoundException(`document not found with ${filters}`)
        }

        return foundDoc
    }

}