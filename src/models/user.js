class User {
  constructor() {
    this.users = [];
    const existingUser1 = {
      id: 1,
      email: 'aobikobe@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password',
    };
    const existingUser2 = {
      id: 2,
      email: 'aob@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password',
    };
    const existingUser3 = {
      id: 3,
      email: 'arinze@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password',
    };
    const existingUser4 = {
      id: 4,
      email: 'ao@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password',
    };
    this.users.push(existingUser1);
    this.users.push(existingUser2);
    this.users.push(existingUser3);
    this.users.push(existingUser4);
    this.lastInsertId = 5;
  }


  create(data) {
    const errorMessage = { error: '' };
    const doesUserExists = this.users.find(user => user.email === data.email);
    if (!data.email || !data.firstName || !data.lastName || !data.password) {
      errorMessage.error = 'One or more fields are empty';
      return errorMessage;
    }
    if (doesUserExists) {
      errorMessage.error = 'User already exists';
      return errorMessage;
    }
    const newId = this.lastInsertId + 1;
    this.lastInsertId += 1;
    const newUser = {
      id: newId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };
    this.users.push(newUser);
    return newUser;
  }


  findOne(email) {
    const errorMessage = { error: '' };
    if (!email) {
      errorMessage.error = 'Invalid parameter';
      return errorMessage;
    }
    const user = this.users.find(u => u.email === email);

    if (!user) {
      errorMessage.error = 'User does not exists';
      return errorMessage;
    }
    return user;
  }
}
export default new User();
