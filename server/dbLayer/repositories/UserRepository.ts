import * as bcrypt from "bcrypt";
import { ConnectionFactory } from "../connectionManager/ConnectionFactory";
import { DbConnection } from "../connectionManager/DbConnection";

export class UserRepository {
  private connectionManager: DbConnection =
    ConnectionFactory.getConnectionManager();

  public async login(email: any) {
    try {
      let connection = await this.connectionManager.getConnection();
      return await connection
        .collection("User")
        .findOne({ email: email });
    } catch (ex) {
      console.error("error during login - ", ex);
    }
  }

  public async correctPassword(candidatePassword: string, userPassword: string) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }

  public async signup(signupBody: any) {
    try {
      let connection = await this.connectionManager.getConnection();
      const password = await bcrypt.hash(signupBody.password, 12);
      const collection = await connection.collection("User")
      const insertedUser = await collection.insertOne({ email: signupBody.email, password: password });
      return await collection.findOne({_id: insertedUser.insertedId});
    } catch (ex) {
      console.error("error during signup - ", ex);
    }
  }
}
