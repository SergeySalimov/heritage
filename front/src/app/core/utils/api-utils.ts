export class ApiUtils {
  static getExpInMstFromJWT(token: string): number|null {
    if (!token) {
      return null;
    }
    const expiry: number|undefined = (JSON.parse(atob(token.split('.')[1])))?.exp;
    return expiry ? expiry * 1000 : null;
  }
}
