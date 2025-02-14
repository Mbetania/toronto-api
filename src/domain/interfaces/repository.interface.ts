import { FilterQuery, UpdateQuery } from "mongoose";

import { ICreateDocument } from "src/application/types";

export interface IRepository<T> {
  create: (data: ICreateDocument<T> | T) => Promise<T>;
  findAll: (filter?: FilterQuery<T>) => Promise<T[]>;
  findOne: (filters: FilterQuery<T>) => Promise<T>;
  update: (_id: string, data: UpdateQuery<T>) => Promise<any>;
  delete: (_id: string) => Promise<any>;
}
