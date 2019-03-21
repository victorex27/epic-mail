import jwt from 'jsonwebtoken';
import customValidator from '../custom-validator';
import db from '../../helpers/query';

class Message {
  static post(req, res) {
    // Check if the item is of the preferred recommendation
    customValidator(req, res);
    if (req.body.to === req.body.from) {
      res.status(403).json({ status: 403, error: 'Cannot be the same' });
    }
    const data = [req.body.subject, req.body.message, 'sent', req.body.from, req.body.to];

    const text = `INSERT INTO messages 
                    (subject, message,status,sender_id,receiver_id) 
                    VALUES 
                    ($1, $2, $3, (Select id from users where email=$4),
                                (Select id from users where email=$5)) returning *`;
    Message.getDataSet(text, data, res, false);
  }

  static getInbox(req, res) {
    const text = 'SELECT * FROM messages';
    const data = [];
    Message.getDataSet(text, data, res, true);
  }

  static getAllSentMessages(req, res) {
    const text = 'SELECT * FROM messages WHERE status=\'sent\'';
    const data = [];
    Message.getDataSet(text, data, res, true);
  }

  static getUnreadInbox(req, res) {
    const text = 'SELECT * FROM messages WHERE status=\'unread\'';
    const data = [];
    Message.getDataSet(text, data, res, true);
  }

  static getDraft(req, res) {
    const text = 'SELECT * FROM messages WHERE status=\'draft\'';
    const data = [];
    Message.getDataSet(text, data, res, true);
  }

  static getMessageById(req, res) {
    const text = 'SELECT * FROM messages WHERE id=$1';
    const data = [req.params.id];
    Message.getDataSet(text, data, res, false);
  }

  static deleteMessage(req, res) {
    if (Number.isNaN(req.params.id)) {
      res.status(404).json({ status: 404, error: 'Invalid Message id' });
    }
    const text = 'DELETE FROM messages WHERE id = $1';
    const data = [req.params.id];
    Message.getDataSet(text, data, res, false);
  }

  static async getDataSet(text, data, res, exPectsMoreThanOne) {
    const dataSet = await db.runQuery(text, data);
    console.log(dataSet);
    if (exPectsMoreThanOne) {
      res.status(201).json({ status: 201, data: dataSet });
    }
    res.status(201).json({ status: 201, data: dataSet[0] });
  }
}
export default Message;
