import MessageModel from '../models/message';

const Message = {
  post(req, res) {
    const newMessage = MessageModel.post(req.body);
    if (newMessage.error) {
      return res.status(400).json({ status: 400, error: newMessage.error });
    }


    return res.status(201).json({ status: 201, data: newMessage });
  },
  getInbox(req, res) {
    const newMessage = MessageModel.getInbox(req.body);
    if (newMessage.error) {
      return res.status(400).json({ status: 400, error: newMessage.error });
    }


    return res.status(200).json({ status: 200, data: newMessage });
  },
  getAllSentMessages(req, res) {
    const newMessage = MessageModel.getAllSentMessages(req.body);
    if (newMessage.error) {
      return res.status(400).json({ status: 400, error: newMessage.error });
    }


    return res.status(200).json({ status: 200, data: newMessage });
  },
  getUnreadInbox(req, res) {
    const newMessage = MessageModel.getUnreadInbox(req.body);
    if (newMessage.error) {
      return res.status(400).json({ status: 400, error: newMessage.error });
    }


    return res.status(200).json({ status: 200, data: newMessage });
  },
  getMessageById(req, res) {
    const newMessage = MessageModel.getMessageById(req.params.id);

    console.log(newMessage.error);
    if (newMessage.error) {
      return res.status(400).json({ status: 400, error: newMessage.error });
    }


    return res.status(200).json({ status: 200, data: newMessage });
  },


};

export default Message;
