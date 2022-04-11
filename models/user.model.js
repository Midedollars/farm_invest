const db = require('../database/mysql')
const queries = require('../database/mysql/queries/user')
const { createUser } = queries;
const { Helpers} = require('../utils')
const {
  AuthHelper: {hashPassword}
} = Helpers


class UserModel {
  constructor(options) {
    this.firstname = options.firstname;
    this.lastname = options.lastname;
    this.phonenumber = options.phonenumber;
    this.email = options.email;
    this.password = hashPassword(options.password);
    this.role = options.role || 'User';
    this.isverified = options.isverified || true;
  }


  async save(){
    try{
      const [user] = await db.execute(createUser, [
        this.firstname,
        this.lastname,
        this.phonenumber,
        this.email,
        this.password,
        this.role,
        this.isverified
      ])
      return user
    }catch(error){
      console.log(error);
      throw error
    }
  } 
}

module.exports = UserModel