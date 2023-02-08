

export abstract class Database {
    protected abstract getAll(tableName: string);
    protected abstract get(tableName: string, _id: string, select?: object);
    protected abstract put(tableName: string, item: object);
    protected abstract update(tableName: string, item: object);
}