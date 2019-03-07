import MessageModel from '../models/message';

const Message = {
  post(req, res) {
    const newMessage = MessageModel.post(req.body);
    if (newMessage.error) {
      return res.status(400).json({ status: 400, error: newMessage.error });
    }


    return res.status(201).json({ status: 201, data: [{ newMessage }] });
  },


};

export default Message;
