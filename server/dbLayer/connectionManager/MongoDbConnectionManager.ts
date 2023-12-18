import { DbConfig } from "./DbConfig";
import { DbConnection } from "./DbConnection";
import * as mongodb from "mongodb";

export class MongoDbConnectionManager implements DbConnection {
  private dbConnectionCache: any;
  private mongoClient: any;
  private static instance: MongoDbConnectionManager;
  public env = process.env.NODE_ENV || "development";

  private constructor() {
    this.dbConnectionCache = {};
    this.mongoClient = mongodb.MongoClient;
  }

  public async getConnection(): Promise<any> {
    let dbObject = null;
    if (this.dbConnectionCache.dbUrl === DbConfig.DbUrl) {
      dbObject = this.dbConnectionCache.db;
    }
    if (dbObject) {
      return dbObject;
    } else {
      let client: any;

      switch (this.env) {
        case "development":
          {
            client = await this.mongoClient.connect(DbConfig.DbUrl, {
              useNewUrlParser: true,
            });
          }
          break;
      }

      const db = client.db(DbConfig.DbName);
      this.dbConnectionCache = { dbUrl: DbConfig.DbUrl, db: db };
      console.log("Connection to mongodb successful !!!");
      return db;
    }
  }

  public static get Instance(): MongoDbConnectionManager {
    if (!this.instance) {
      this.instance = new MongoDbConnectionManager();
    }
    return this.instance;
  }
}
