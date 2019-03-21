import customValidator from '../custom-validator';
import db from '../../helpers/query';

class Group {
  static async create(req, res) {
    customValidator(req, res);

    const text = `WITH query1 AS (
      INSERT INTO groups(name) VALUES ($1) RETURNING id)
      INSERT INTO group_members(group_id,member_id,role)
        VALUES (
          (SELECT id from query1),
          $2,$3) returning *
      ;`;
    const data = [req.body.name, req.user.id, 'admin'];

    const rows = await db.runQuery(text, data);
    
    res.status(201).json({ status: 201, data: rows[0] });
  }

  static async getAllGroups(req, res) {
    const text = `SELECT groups.id,groups.name,group_members.role 
FROM groups,group_members  
WHERE groups.id = group_members.group_id 
AND group_members.role= 'admin' AND group_members.member_id = $1;`;

    const data = [req.user.id];
    const rows = await db.runQuery(text, data);
    res.status(201).json({ status: 201, data: rows });
  }

  static async updateGroupName(req, res) {
    const text = `
    UPDATE groups SET name = $1 
FROM group_members
WHERE groups.id = $2
AND 
groups.id = group_members.group_id 
AND group_members.member_id = $3
AND role='admin' returning *`;
    const data = [req.body.name, req.params.groupId,req.user.id];
    
    const rows = await db.runQuery(text, data);
    res.status(201).json({ status: 201, data: rows[0] });
  }

  static async deleteGroup(req, res) {
    // AND group_members.id = current user
    // add a field here to show if the field has been deleted or not
    const text = 'DELETE groups WHERE groups.id = $1 AND id IN (SELECT group_id FROM group_members WHERE member_id = $2 AND role=\'admin\' )';
    const data = [req.params.id,req.user.id];
    const rows = await db.runQuery(text, data);
    res.status(200).json({ status: 200, data: rows[0] });
    
  }


  static async addUsersToGroup(req, res) {
    //have not done this
    customValidator(req);
    
    const text = `INSERT INTO
        group_members,groups(name, role)
        VALUES($1,$2) WHERE groups.id = $3
        returning *`;
        const data = [req.params.userId,'user', req.params.groupId,req.user.id];
        const rows = await db.runQuery(text, data);
    res.status(201).json({ status: 201, data: rows[0] });
        
  }

  static async deleteMemberFromGroup(req, res) {
    // AND group_members.id = current user
    const text = 'DELETE FROM group_members WHERE group_members.member_id=$1 AND groups.id = $2 AND groups.id IN (SELECT group_id FROM group_members WHERE member_id = $3 AND role=\'admin\' )';
    const data = [req.params.userId, req.params.groupId, req.user.id];
    const rows = await db.runQuery(text, data);
    res.status(200).json({ status: 200, data: rows[0] });
    
  }


  static async sendMailToGroup(req, res) {
    // AND group_members.id = current user
     const text1 = 'SELECT member_id from group_members WHERE group_members.group_id = group.id and member.id = $1';

    const data = [req.params.userId, req.params.groupId, '1'];
    const text2 = `INSERT INTO messages (sender_id,receiver_id,message,subject,status,group_id) VALUES
      ($1,$2,$3,$4,$5,$6) WHERE receiver_id != $2
    `;
    const rows = await db.runQuery(text, data);
    res.status(200).json({ status: 200, data: rows[0] });
    
  }
}

export default Group;
