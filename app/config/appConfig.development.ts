export class AppConfigDevelopment {
  private static config: any = {
    port: 9000,
    dbName: "QuestionSortner",
    indexFile: "index.html",
    baseUrl: "http://localhost:4200",
    jwtSecret: "my-ultra-long-and-ultra-hard-secret-jwt",
    jwtCookieExpiresIn: 1
  };

  public static get Config(): any {
    return this.config;
  }
}
