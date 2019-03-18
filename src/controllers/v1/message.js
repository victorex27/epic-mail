import customValidator from '../custom-validator';
import MessageModel from '../../models/v1/message';

class Message {
  static post(req, res) {
    let result = customValidator(req);
    if (result.error) {
      return res.status(result.status).json({ status: result.status, error: result.error });
    }
    result = Message.controller(req, res, 'post');

    if (result.error) {
      return res.status(result.status).json({ status: result.status, error: result.data });
    }
    return res.status(result.status).json({ status: result.status, data: result.data });
  }

  static getInbox(req, res) {
    const result = Message.controller(req, res, 'getinbox');
    return res.status(result.status).json({ status: result.status, data: result.data });
  }

  static getAllSentMessages(req, res) {
    const result = Message.controller(req, res, 'getsent');
    return res.status(result.status).json({ status: result.status, data: result.data });
  }

  static getUnreadInbox(req, res) {
    const result = Message.controller(req, res, 'getunread');
    return res.status(result.status).json({ status: result.status, data: result.data });
  }

  static getMessageById(req, res) {
    const result = Message.controller(req, res, 'getmessagebyid');
    if (result.error) {
      return res.status(result.status).json({ status: result.status, error: result.data });
    }
    return res.status(result.status).json({ status: result.status, data: result.data });
  }

  static deleteMessage(req, res) {
    const result = Message.controller(req, res, 'delete');
    if (result.error) {
      return res.status(result.status).json({ status: result.status, error: result.data });
    }
    return res.status(result.status).json({ status: result.status, data: result.data });
  }

  static controller(req, res, action) {
    let newMessage;
    let error = 404;
    let success = 200;
    switch (action) {
      case 'post':
        newMessage = MessageModel.post(req.body);
        error = 400;
        success = 201;
        break;
      case 'getsent':
        newMessage = MessageModel.getAllSentMessages(req.body);
        break;
      case 'getunread':
        newMessage = MessageModel.getUnreadInbox(req.body);
        break;
      case 'getmessagebyid':
        newMessage = MessageModel.getMessageById(req.params.id);
        break;
      case 'delete':
        newMessage = MessageModel.deleteMessage(req.params.id);
        break;
      default:
        newMessage = MessageModel.getInbox(req.body);
        break;
      /** Default is to get inbox */
    }
    if (newMessage.error) {
      return { error: true, status: error, data: newMessage.error };
    }
    return { error: false, status: success, data: newMessage };
  }
}

export default Message;
