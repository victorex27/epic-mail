import User from './user';

class Message {
  constructor() {
    this.messages = [
      {
        id: 1,
        createdOn: Date.now(),
        subject: 'Hello',
        message: 'all',
        parentMessageId: 0,
        status: 'sent',
        senderId: 1,
        receiverId: 2,
      }, {
        id: 2,
        createdOn: Date.now(),
        subject: 'you there',
        message: 'all',
        parentMessageId: 0,
        status: 'sent',
        senderId: 1,
        receiverId: 2,
      },
      {
        id: 3,
        createdOn: Date.now(),
        subject: 'how far',
        message: 'all',
        parentMessageId: 0,
        status: 'sent',
        senderId: 2,
        receiverId: 1,
      }, {
        id: 4,
        createdOn: Date.now(),
        subject: 'how far',
        message: 'all',
        parentMessageId: 0,
        status: 'sent',
        senderId: 2,
        receiverId: 1,
      },
    ];
    this.lastInsertId = this.messages.length;
  }

  post(data) {
    const errorMessage = { error: '' };
    const sender = User.findOne(data.from);
    const receiver = User.findOne(data.to);
    /** change invalid parameter to some fields missing */
    if (sender.error === 'Invalid parameter' || sender.error === 'User does not exists') {
      errorMessage.error = 'Incorrect sender Id';
      return errorMessage;
    }
    if (receiver.error === 'Invalid parameter' || receiver.error === 'User does not exists') {
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
      createdOn: Date.now(),
      subject: data.subject,
      message: data.message,
      parentMessageId: 0,
      status: 'sent',
      senderId: sender.id,
      receiverId: receiver.id,
    };

    this.messages.push(insertMessage);
    return [insertMessage];
  }

  getAllSentMessages(data) {
    const errorMessage = { error: '' };
    const sender = User.findOne(data.email);
    if (sender.error === 'User does not exists') {
      errorMessage.error = 'Unkwnown user';
      return errorMessage;
    }
    const message = this.getMessage(true, sender, false);

    return message;
  }

  getInbox(data) {
    const errorMessage = { error: '' };
    const receiver = User.findOne(data.email);
    if (receiver.error === 'User does not exists') {
      errorMessage.error = 'Unkwnown user';

      return errorMessage;
    }

    const message = this.getMessage(false, receiver, false);

    return message;
  }

  getUnreadInbox(data) {
    const errorMessage = { error: '' };
    const receiver = User.findOne(data.email);
    if (receiver.error) {
      errorMessage.error = 'Unkwnown user';
      return errorMessage;
    }
    const message = this.getMessage(false, receiver, true);
    return message;
  }

  getMessageById(id) {
    const errorMessage = { error: '' };
    const result = [];
    const message = this.messages.find(msg => msg.id === Number(id));


    if (!message) {
      errorMessage.error = 'Invalid number';
      return errorMessage;
    }

    result.push(message);
    return result;
  }

  deleteMessage(id) {
    const errorMessage = { error: 'Invalid operation' };
    const message = this.getMessageById(id);
    if (message.error) {
      errorMessage.error = 'Invalid Message id';
      return errorMessage;
    }

    const result = { message: '' };
    result.message = message[0].message;

    const index = this.messages.indexOf(message[0]);
    if (index > -1) {
      this.messages.splice(index, 1);
    } else {
      errorMessage.error = 'Invalid Message id';
      return errorMessage;
    }
    return result;
  }

  /* Returns a message */
  getMessage(isSenderId, user, isUnRead) {
    let searchField;
    const message = this.messages.reduce((arr, msg) => {
      if (isSenderId) {
        searchField = msg.senderId;
      } else {
        searchField = msg.receiverId;
      }

      if (isUnRead) {
        if (searchField === user.id && msg.status !== 'read' && msg.status !== 'draft') {
          arr.push(msg);
        }
      } else if (searchField === user.id && msg.status !== 'draft') {
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
}

export default new Message();
