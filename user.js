const sqlite = require('sqlite3');
const db = new sqlite.Database(':memory:');

db.serialize(() => {
    const sql = 'CREATE TABLE IF NOT EXISTS users(emailId string primary key, name string, dob string, mob integer, password string, gender string, reqUpdates boolean, isAdmin boolean)';
    db.run(sql);
    db.run('INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?)', 'admin@admin.com', 'Admin', '', '1234567890', 'admin', 'M', 'true', 'true');
});

class User{
    constructor(emailId, dob, mob, password, gender, reqUpdates, name, isAdmin){
        this.emailId = emailId;
        this.dob = dob;
        this.mob = mob;
        this.password = password;
        this.gender = gender;
        this.reqUpdates = reqUpdates;
        this.name = name;
        this.isAdmin = !!isAdmin;
    }

    static all(callback) {
        db.all('SELECT * FROM users', callback);
    }

    static add(user, callback) {
        const sql = 'INSERT INTO users VALUES(?, ?, ?, ?, ?, ?, ?, ?)';
        db.run(sql, user.emailId, user.name, user.dob, user.mob, user.password, user.gender, user.reqUpdates, user.isAdmin, callback);
    }

    static update(user, callback) {
        const sql = 'UPDATE users SET dob = ?, mob = ?, password = ?, gender = ?, reqUpdates = ?, name = ? WHERE emailId = ?';
        db.run(sql, user.dob, user.mob, user.password, user.gender, user.reqUpdates, user.name, user.emailId, callback);
    }

    static delete(emailId, callback) {
        const sql = 'DELETE FROM users WHERE emailId = ?';
        db.run(sql, emailId, callback);
    }

    static find(user, callback) {
        const sql = 'SELECT * FROM users WHERE emailId = ? and password = ?';
        db.all(sql, user.emailId, user.password, callback);
    }
}

module.exports = User;