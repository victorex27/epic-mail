import customValidator from '../custom-validator';
import db from '../../helpers/query';

class Message {
  static async post(req, res) {
    // Check if the item is of the preferred recommendation
    const validator = customValidator(req, res);

    if (validator.error) {
      return res.status(403).json({ status: 403, error: validator.error });
    }

    if (req.user.email === req.body.to) {
      return res.status(403).json({ status: 403, error: 'user id and receiver id are the same' });
    }

    const receiver = await db.runQuery('Select id from users where email=$1', [req.body.to]);
    if (!receiver[0]) {
      return res.status(403).json({ status: 403, error: 'This user account does not exists.' });
    }
    const data = [req.body.subject, req.body.message, 'sent', req.user.id, receiver[0].id];

    const text = `INSERT INTO messages 
                    (subject, message,status,sender_id,receiver_id) 
                    VALUES 
                    ($1, $2, $3, $4,
                                $5) returning *`;
    Message.getDataSet(text, data, res, false);
    return res;
  }

  static getInbox(req, res) {
    const text = 'SELECT * FROM messages WHERE receiver_id = $1';
    const data = [req.user.id];
    Message.getDataSet(text, data, res, true);
  }

  static getAllSentMessages(req, res) {
    const text = 'SELECT * FROM messages WHERE status=\'sent\' AND sender_id = $1';
    const data = [req.user.id];
    Message.getDataSet(text, data, res, true);
  }

  static getUnreadInbox(req, res) {
    const text = 'SELECT * FROM messages WHERE status=\'unread\' AND receiver_id = $1';
    const data = [req.user.id];
    Message.getDataSet(text, data, res, true);
  }

  static getDraft(req, res) {
    const text = 'SELECT * FROM messages WHERE status=\'draft\' AND sender_id = $1';
    const data = [req.user.id];
    Message.getDataSet(text, data, res, true);
  }

  static getMessageById(req, res) {
    const text = 'SELECT * FROM messages WHERE id=$1  ';
    const data = [req.params.id];
    Message.getDataSet(text, data, res, false);
  }

  static deleteMessage(req, res) {
    if (Number.isNaN(req.params.id)) {
      res.status(404).json({ status: 404, error: 'Invalid Message id' });
    }
    const text = 'DELETE FROM messages WHERE id = $1 ';
    const data = [req.params.id];
    return Message.getDataSet(text, data, res, false);
  }

  static async getDataSet(text, data, res, exPectsMoreThanOne) {
    const dataSet = await db.runQuery(text, data);
    if (dataSet.error) {
      switch (dataSet.error) {
        case 'ExecConstraints':
          {
            res.status(403).json({ status: 403, error: 'Exec Constraints' });
          }
          break;
        default:
          res.status(403).json({ status: 403, error: 'Un identified error' });
          break;
      }
    }
    if (exPectsMoreThanOne) {
      res.status(201).json({ status: 201, data: dataSet });
    } else {
      res.status(201).json({ status: 201, data: dataSet[0] });
    }
  }
}
export default Message;
