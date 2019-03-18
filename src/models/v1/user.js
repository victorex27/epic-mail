class User {
  constructor() {
    this.users = [{
      id: 1,
      email: 'aobikobe@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password',
    },
    {
      id: 2,
      email: 'aob@gmail.com',
      firstName: 'Victor',
      lastName: 'Obikobe',
      password: 'password',
    },
    {
      id: 3,
      email: 'arinze@gmail.com',
      firstName: 'Arinze',
      lastName: 'Obikobe',
      password: 'password',
    }, {
      id: 4,
      email: 'ao@gmail.com',
      firstName: 'Amaobi',
      lastName: 'Obikobe',
      password: 'password',
    },
    ];
    this.lastInsertId = this.users.length;
  }


  create(data) {
    
    const doesUserExists = this.users.find(user => user.email === data.email);
    if (doesUserExists) {
      const errorMessage = { error: 'User already exists' };
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
    const user = this.users.find(u => u.email === email);

    if (!user) {
      const errorMessage = { error: 'User does not exists' };
      return errorMessage;
    }
    return user;
  }

  login(data) {
    const user = this.users.find(u => (u.email === data.email && u.password === data.password));

    if (!user) {
      const errorMessage = { error: 'Incorrect login credentials' };
      return errorMessage;
    }
    return user;
  }
}
export default new User();
