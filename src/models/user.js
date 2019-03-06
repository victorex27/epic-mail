class User {
  constructor() {
    this.users = [];
    const existingUser = {
      id: 1,
      email: 'aobikobe@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password',
    };
    this.users.push(existingUser);
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

    const newUser = {
      id: 2,
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
