import db from '../src/db';

after((done) => {
  try {
    const values = [];
    db.query('drop table users,messages;', values);
  } catch (e) {
    console.log(`Teardown: ${e}`);
  }
  done();
});
