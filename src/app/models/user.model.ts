export class User {
  constructor(
    private id: number,
    private firstName: string,
    private lastName: string,
    private email: string,
    private status: boolean,
    private userToken: string,
    private expirationDate: Date,
  ) { }

  get expireDate() {
    return this.expirationDate;
  }

  get token() {
    return this.userToken
  }


}