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
    
    if (sender.error) {
      errorMessage.error = sender.error;
      return errorMessage;
    }

    if (receiver.error) {
      errorMessage.error = receiver.error;
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

  getAllSentMessages() {
    const message = this.getMessage('sent');

    return message;
  }

  getInbox() {
    const message = this.getMessage('received');
    return message;
  }

  getUnreadInbox() {
    const message = this.getMessage('unread');
    return message;
  }

  getMessageById(id) {
    if (Number.isNaN(id)) {
      return { error: 'Invalid Message id' };
    }
    const message = this.messages.find(msg => msg.id === Number(id));

    if (message instanceof Object) {
      return message;
    }
    return { error: `message id ${id} does not exist` };
  }

  deleteMessage(id) {
    const message = this.getMessageById(id);
    if (message.error) {
      return message;
    }

    const result = { message: `message id ${id} has been deleted` };

    const index = this.messages.indexOf(message);

    this.messages.splice(index, 1);
    return result;
  }

  /* Returns a message */
  getMessage(status) {
    let message;

    /** Default is recieved */

    switch (status) {
      case 'sent':
        message = this.messages.reduce((arr, msg) => { if (msg.status === 'sent') { arr.push(msg); } return arr; }, []);
        break;
      case 'unread':
        message = this.messages.reduce((arr, msg) => { if (msg.status === 'sent') { arr.push(msg); } return arr; }, []);
        break;
      default:
        message = this.messages.reduce((arr, msg) => { if (msg.status !== 'draft') { arr.push(msg); } return arr; }, []);
        break;
    }
    return message;
  }
}

export default new Message();
