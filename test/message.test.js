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
      expect(messageBody).to.have.property('id').to.be.a('number');
      expect(messageBody).to.have.property('createdOn');
      expect(messageBody).to.have.property('subject').to.be.a('string');
      expect(messageBody).to.have.property('message').to.be.a('string');
      expect(messageBody).to.have.property('parentMessageId').to.be.a('number');
      expect(messageBody).to.have.property('status').to.be.a('string');
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
      expect(messageBody).to.have.property('error').to.be.a('string').equal('Incorrect receiver Id');
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
      expect(messageBody).to.have.property('error').to.be.a('string').equal('Incorrect sender Id');
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
  describe('getAllSentMessages(\'aobikobe@gmail.com\')', () => {
    it('should return all sent messages for a valid user with sent items', () => {
      const email = 'aobikobe@gmail.com';
      const sent = Message.getAllSentMessages(email);


      expect(sent).to.be.a('array');
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
    });
  });

  describe('getAllSentMessages()', () => {
    it('sholud return Unkwnown user for incorrect email address', () => {
      const email = 'xyz@gmail.com';
      const sent = Message.getAllSentMessages(email);
      expect(sent).to.have.property('error').to.be.a('string').equal('Unkwnown user');
    });
  });
  describe('getAllSentMessages(\'arinze@gmail.com\')', () => {
    it('should return empty for user with no sent items', () => {
      const email = 'arinze@gmail.com';
      const sent = Message.getAllSentMessages(email);

      expect(sent).to.deep.equal({});
    });
  });
  describe('getInbox(\'aobikobe@gmail.com\')', () => {
    it('should return all received messages for a valid user with inbox items', () => {
      const email = 'aobikobe@gmail.com';
      const inbox = Message.getInbox(email);
      expect(inbox).to.be.a('array');

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
    });
  });
  describe('getInbox()', () => {
    it('sholud return Unkwnown user for incorrect email address', () => {
      const email = 'xy99z@gmail.com';
      const inbox = Message.getInbox(email);

      expect(inbox).to.have.property('error').to.be.a('string').equal('Unkwnown user');
    });
  });
  describe('getInbox()', () => {
    it('should return empty for user with no received emails', () => {
      const email = 'ao@gmail.com';
      const inbox = Message.getInbox(email);
      expect(inbox).to.deep.equal({});
    });
  });

  describe('getUnreadInbox(\'aobikobe@gmail.com\')', () => {
    it('should return all unread received messages for a valid user', () => {
      const email = 'aobikobe@gmail.com';
      const unread = Message.getUnreadInbox(email);
      expect(unread).to.be.a('array');

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
    });
  });
  describe('getUnreadInbox(\'\')', () => {
    it('sholud return Unkwnown user for incorrect email address', () => {
      const email = '';
      const unread = Message.getUnreadInbox(email);
      expect(unread).to.have.property('error').to.be.a('string').equal('Unkwnown user');
    });
  });
  describe('getUnreadInbox(\'ao@gmail.com\')', () => {
    it('should return empty for user with no unread received emails', () => {
      const email = 'ao@gmail.com';
      const unread = Message.getUnreadInbox(email);
      expect(unread).to.deep.equal({});
    });
  });

  describe('getMessageById(1)', () => {
    it('should return a message ', () => {
      const id = 1;
      const message = Message.getMessageById(id);

      expect(message).to.be.a('object');
      expect(message).to.have.property('id').to.be.a('number');
      expect(message).to.have.property('createdOn');
      expect(message).to.have.property('subject').to.be.a('string');
      expect(message).to.have.property('message').to.be.a('string');
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
  describe('deleteMessage(1)', () => {
    it('should return The deleted message', () => {
      const id = 1;
      const message = Message.deleteMessage(id);
      expect(message).to.have.property('message').to.be.a('string');
    });
  });
  describe('deleteMessage(\'\')', () => {
    it('should return Invalid Message id', () => {
      const id = '';
      const message = Message.deleteMessage(id);
      expect(message).to.have.property('error').to.be.a('string').equal('Invalid Message id');
    });
  });
});
