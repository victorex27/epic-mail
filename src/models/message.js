import User from './user';

class Message {
  constructor() {
    this.messages = [];
    const insertMessage1 = {
      id: 1,
      createdOn: 'now',
      subject: 'Hello',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 1,
      receiverId: 2,
    };
    const insertMessage2 = {
      id: 2,
      createdOn: 'now',
      subject: 'you there',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 1,
      receiverId: 2,
    };
    const insertMessage3 = {
      id: 3,
      createdOn: 'now',
      subject: 'how far',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 2,
      receiverId: 1,
    };
    const insertMessage4 = {
      id: 4,
      createdOn: 'now',
      subject: 'how far',
      message: 'all',
      parentMessageId: 0,
      status: 'sent',
      senderId: 2,
      receiverId: 1,
    };
    this.lastInsertId = 5;

    this.messages.push(insertMessage1);
    this.messages.push(insertMessage2);
    this.messages.push(insertMessage3);
    this.messages.push(insertMessage4);
  }

  post(data) {
    const errorMessage = { error: '' };
    const sender = User.findOne(data.from);
    const receiver = User.findOne(data.to);

    if (sender.error === 'User does not exists') {
      errorMessage.error = 'Incorrect sender Id';
      return errorMessage;
    }
    if (receiver.error === 'User does not exists') {
      errorMessage.error = 'Incorrect receiver Id';
      return errorMessage;
    }


    if (sender.id === receiver.id) {
      errorMessage.error = 'Sender id and receiver id can not be the same';
      return errorMessage;
    }

    const newId = this.lastInsertId + 1;
    this.lastInsertId += 1;


    const insertMessage = {
      id: newId,
      createdOn: 'now',
      subject: data.subject,
      message: data.message,
      parentMessageId: 0,
      status: 'sent',
      senderId: sender.id,
      receiverId: receiver.id,
    };

    // change this
    const newMessage = [
      insertMessage,
    ];
    this.messages.push(insertMessage);
    return newMessage;
  }

  getAllSentMessages(data) {
    const errorMessage = { error: '' };
    const sender = User.findOne(data.email);
    if (sender.error === 'User does not exists') {
      errorMessage.error = 'Unkwnown user';
      return errorMessage;
    }
    // const message = this.messages.find(m => m.senderId === sender.id);
    const message = this.messages.reduce((arr, msg) => {
      if (msg.senderId === sender.id && msg.status !== 'drafft') {
        arr.push(msg);
      }
      return arr;
    }, []);

    if (message.length === 0) {
      // errorMessage.error = 'User does not exists';
      return [];
    }
    return message;
  }

  getInbox(data) {
    const errorMessage = { error: '' };
    const receiver = User.findOne(data.email);
    if (receiver.error === 'User does not exists') {
      errorMessage.error = 'Unkwnown user';

      return errorMessage;
    }
    // const message = this.messages.find(m => m.senderId === sender.id);
    const message = this.messages.reduce((arr, msg) => {
      if (msg.receiverId === receiver.id && msg.status !== 'draft') {
        arr.push(msg);
      }
      return arr;
    }, []);

    if (message.length === 0) {
      // errorMessage.error = 'User does not exists';
      return [];
    }

    return message;
  }

  getUnreadInbox(data) {
    const errorMessage = { error: '' };
    const receiver = User.findOne(data.email);
    if (receiver.error) {
      errorMessage.error = 'Unkwnown user';
      return errorMessage;
    }
    // const message = this.messages.find(m => m.senderId === sender.id);
    const message = this.messages.reduce((arr, msg) => {
      if (msg.receiverId === receiver.id && msg.status !== 'read' && msg.status !== 'draft') {
        arr.push(msg);
      }
      return arr;
    }, []);

    if (message.length === 0) {
      // errorMessage.error = 'User does not exists';
      return [];
    }
    return message;
  }

  getMessageById(data) {
    const errorMessage = { error: '' };
    const message = this.messages.find(msg => msg.id === data.id);

    if (!message) {
      errorMessage.error = 'Invalid number';
      return errorMessage;
    }
    return message;
  }

  deleteMessage(data) {
    const errorMessage = { error: '' };
    const message = this.getMessageById(data);
    const result = { message: '' };

    if (message.error) {
      errorMessage.error = 'Invalid Message id';
      return errorMessage;
    }

    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
    result.message = message.message;
    return result;
    // this.messages.
  }
}

export default new Message();
