import { expect } from 'chai';
import Message from '../src/models/message';

describe('Message', () => {
  describe('post(data)', () => {
    it('should return a message body', () => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'aob@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      messageBody.forEach((message) => {
        expect(message).to.have.property('id').to.be.a('number');
        expect(message).to.have.property('createdOn');
        expect(message).to.have.property('subject').to.be.a('string');
        expect(message).to.have.property('message').to.be.a('string');
        expect(message).to.have.property('parentMessageId').to.be.a('number');
        expect(message).to.have.property('status').to.be.a('string');
      });
    });
  });

  describe('post(data)', () => {
    it('should return Incorrect receiver Id', () => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'xyz@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('error').to.be.a('string');
    });
  });
  describe('post(data)', () => {
    it('should return Incorrect sender Id', () => {
      const data = {
        from: 'xyz@gmail.com',
        to: 'aobikobe@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('error').to.be.a('string');
    });
  });
  describe('post(data)', () => {
    it('should return Sender id and receiver id can not be the same', () => {
      const data = {
        from: 'aobikobe@gmail.com',
        to: 'aobikobe@gmail.com',
        subject: 'How do you do',
        message: 'this is going to be a sweet test',
      };

      const messageBody = Message.post(data);
      expect(messageBody).to.have.property('error').to.be.a('string').equal('Sender id and receiver id can not be the same');
    });
  });
  describe('getAllSentMessages()', () => {
    it('should return all sent messages for a valid user with sent items', () => {
      const sent = Message.getAllSentMessages();


      expect(sent).to.be.a('array');
      if (sent.length !== 0) {
        sent.forEach((member) => {
          expect(member).to.have.property('createdOn');
          expect(member).to.have.property('subject').to.be.a('string');
          expect(member).to.have.property('message').to.be.a('string');
          expect(member).to.have.property('senderId').to.be.a('number');
          expect(member).to.have.property('receiverId').to.be.a('number');
          expect(member).to.have.property('parentMessageId').to.be.a('number');
          expect(member).to.have.property('status').to.be.a('string');
          expect(member).to.have.property('id').to.be.a('number');
        });
      }
    });
  });

  describe('getInbox()', () => {
    it('should return all received messages for a valid user with inbox items', () => {
      const inbox = Message.getInbox();
      expect(inbox).to.be.a('array');

      if (inbox.length !== 0) {
        inbox.forEach((member) => {
          expect(member).to.have.property('createdOn');
          expect(member).to.have.property('subject').to.be.a('string');
          expect(member).to.have.property('message').to.be.a('string');
          expect(member).to.have.property('senderId').to.be.a('number');
          expect(member).to.have.property('receiverId').to.be.a('number');
          expect(member).to.have.property('parentMessageId').to.be.a('number');
          expect(member).to.have.property('status').to.be.a('string');
          expect(member).to.have.property('id').to.be.a('number');
        });
      }
    });
  });

  describe('getUnreadInbox()', () => {
    it('should return all unread received messages for a valid user', () => {
      const unread = Message.getUnreadInbox();
      expect(unread).to.be.a('array');

      if (unread.length !== 0) {
        unread.forEach((member) => {
          expect(member).to.have.property('createdOn');
          expect(member).to.have.property('subject').to.be.a('string');
          expect(member).to.have.property('message').to.be.a('string');
          expect(member).to.have.property('senderId').to.be.a('number');
          expect(member).to.have.property('receiverId').to.be.a('number');
          expect(member).to.have.property('parentMessageId').to.be.a('number');
          expect(member).to.have.property('status').to.be.a('string');
          expect(member).to.have.property('id').to.be.a('number');
        });
      }
    });
  });

  describe('getMessageById(3)', () => {
    it('should return a message ', () => {
      const id = 3;
      const message = Message.getMessageById(id);


      expect(message).to.be.a('object');

      expect(message).to.have.property('createdOn');
      expect(message).to.have.property('subject').to.be.a('string');
      expect(message).to.have.property('message').to.be.a('string');
      expect(message).to.have.property('senderId').to.be.a('number');
      expect(message).to.have.property('receiverId').to.be.a('number');
      expect(message).to.have.property('parentMessageId').to.be.a('number');
      expect(message).to.have.property('status').to.be.a('string');
      expect(message).to.have.property('id').to.be.a('number');
    });
  });
  describe('getMessageById(\'p\')', () => {
    it('should return Invalid message id', () => {
      const id = 'p';

      const message = Message.getMessageById(id);
      expect(message).to.have.property('error').to.be.a('string');
    });
  });
  describe('deleteMessage(4)', () => {
    it('should return The deleted message', () => {
      const id = 4;
      const message = Message.deleteMessage(id);
      expect(message).to.have.property('message').to.be.a('string');
    });
  });
  describe('deleteMessage(\'p\')', () => {
    it('should return Invalid message id', () => {
      const id = '';
      const message = Message.deleteMessage(id);
      expect(message).to.have.property('error').to.be.a('string');
    });
  });
});
