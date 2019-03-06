import { expect } from 'chai';

describe('Message', () => {
  describe('post()', () => {
    it('should return a message body', () => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'aob@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('id').to.be.a('number');
      expect(messageBody).to.have.property('createdOn');
      expect(messageBody).to.have.property('subject').to.be.a('string');
      expect(messageBody).to.have.property('message').to.be.a('string');
      expect(messageBody).to.have.property('parentMessageId').to.be.a('number');
      expect(messageBody).to.have.property('status').to.be.a('string');
    });
  });
  describe('post()', () => {
    it('should return One or more fields are missing for missing fields', () => {
      const data = {
        from: '',
        to: 'aob@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('error').to.be.a('string').equal('should return One or more fields are missing');
    });
  });
  describe('post()', () => {
    it('should return Incorrect receiver Id', () => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'xyz@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('error').to.be.a('string').equal('Incorrect receiver Id');
    });
  });
  describe('post()', () => {
    it('should return Incorrect sender Id', () => {
      const data = {
        from: 'xyz@gmail.com',
        to: 'xyz1@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('error').to.be.a('string').equal('Incorrect sender Id');
    });
  });
  describe('post()', () => {
    it('should return Sender id and receiver id can not be the same', () => {
      const data = {
        from: 'xyz@gmail.com',
        to: 'xyz@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('error').to.be.a('string').equal('Sender id and receiver id can not be the same');
    });
  });
  describe('getAllSentMessages(\'aobikobe@gmail.com\')', () => {
    it('should return all sent messages for a valid user with sent items', () => {
      const email = 'aobikobe@gmail.com';
      const sent = Message.getAllSentMessages(email);
      expect(sent).to.be.a('array');
      expect(sent).to.have.property('id').to.be.a('number');
      expect(sent).to.have.property('createdOn');
      expect(sent).to.have.property('subject').to.be.a('string');
      expect(sent).to.have.property('message').to.be.a('message');
      expect(sent).to.have.property('senderId').to.be.a('number');
      expect(sent).to.have.property('receiverId').to.be.a('number');
      expect(sent).to.have.property('parentMessageId').to.be.a('number');
      expect(sent).to.have.property('status').to.be.a('string');
    });
  });

  describe('getAllSentMessages()', () => {
    it('sholud return Unkwnown user for incorrect email address', () => {
      const email = 'xyz@gmail.com';
      const sent = Message.getAllSentMessages(email);
      expect(sent).to.have.property('error').to.be.a('string').equal('Unkwnown user');
    });
  });
  describe('getAllSentMessages(\'aobikobe@gmail.com\')', () => {
    it('should return empty for user with no sent items', () => {
      const email = 'aob@gmail.com';
      const sent = Message.getAllSentMessages(email);
      expect(sent).equal({});
    });
  });
  describe('getInbox(\'aobikobe@gmail.com\')', () => {
    it('should return all received messages for a valid user with inbox items', () => {
      const email = 'aobikobe@gmail.com';
      const inbox = Message.getInbox(email);
      expect(inbox).to.be.a('array');
      expect(inbox).to.have.property('id').to.be.a('number');
      expect(inbox).to.have.property('createdOn');
      expect(inbox).to.have.property('subject').to.be.a('string');
      expect(inbox).to.have.property('message').to.be.a('message');
      expect(inbox).to.have.property('senderId').to.be.a('number');
      expect(inbox).to.have.property('receiverId').to.be.a('number');
      expect(inbox).to.have.property('parentMessageId').to.be.a('number');
      expect(inbox).to.have.property('status').to.be.a('string');
    });
  });
  describe('getInbox()', () => {
    it('sholud return Unkwnown user for incorrect email address', () => {
      const email = 'xyz@gmail.com';
      const inbox = Message.getAllinboxMessages(email);
      expect(inbox).to.have.property('error').to.be.a('string').equal('Unkwnown user');
    });
  });
  describe('getInbox()', () => {
    it('should return empty for user with no received emails', () => {
      const email = 'aob@gmail.com';
      const inbox = Message.getAllinboxMessages(email);
      expect(inbox).equal({});
    });
  });

  describe('getUnreadInbox(\'aobikobe@gmail.com\')', () => {
    it('should return all unread received messages for a valid user', () => {
      const email = 'aobikobe@gmail.com';
      const unread = Message.getUnreadInbox(email);
      expect(unread).to.be.a('array');
      expect(unread).to.have.property('id').to.be.a('number');
      expect(unread).to.have.property('createdOn');
      expect(unread).to.have.property('subject').to.be.a('string');
      expect(unread).to.have.property('message').to.be.a('message');
      expect(unread).to.have.property('senderId').to.be.a('number');
      expect(unread).to.have.property('receiverId').to.be.a('number');
      expect(unread).to.have.property('parentMessageId').to.be.a('number');
      expect(unread).to.have.property('status').to.be.a('string');
    });
  });
  describe('getUnreadInbox(\'\')', () => {
    it('sholud return Unkwnown user for incorrect email address', () => {
      const email = '';
      const unread = Message.getUnreadInbox(email);
      expect(unread).to.have.property('error').to.be.a('string').equal('Unkwnown user');
    });
  });
  describe('getUnreadInbox(\'aob@gmail.com\')', () => {
    it('should return empty for user with no unread received emails', () => {
      const email = 'aob@gmail.com';
      const unread = Message.getUnreadInbox(email);
      expect(unread).equal({});
    });
  });

  describe('getMessageById(1)', () => {
    it('should return a message with id 1', () => {
      const id = 1;
      const message = Message.getMessageById(id);
      expect(message).to.be.a('array');
      expect(message).to.have.property('id').to.be.a('number');
      expect(message).to.have.property('createdOn');
      expect(message).to.have.property('subject').to.be.a('string');
      expect(message).to.have.property('message').to.be.a('message');
      expect(message).to.have.property('senderId').to.be.a('number');
      expect(message).to.have.property('receiverId').to.be.a('number');
      expect(message).to.have.property('parentMessageId').to.be.a('number');
      expect(message).to.have.property('status').to.be.a('string');
    });
  });
  describe('getMessageById(\'\')', () => {
    it('should return Invalid number', () => {
      const id = '';
      const message = Message.getMessageById(id);
      expect(message).to.have.property('error').to.be.a('string').equal('Invalid number');
    });
  });
});
