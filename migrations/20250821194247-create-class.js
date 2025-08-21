'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
    db.createTable('class', {
        uid: { type: 'int', primaryKey: true, autoIncrement: true },
        degree_id: {
            type: 'int',
            notNull: true,
            foreignKey: {
                name: 'class_degree_fk',
                table: 'degree',
                mapping: 'id',
                rules: {
                    onDelete: 'CASCADE',
                    onUpdate: 'RESTRICT'
                }
            }
        },
        code: { type: 'int', unique: true, notNull: true },
        name: { type: 'string', notNull: true },
        grade: { type: 'int' },
        credits: { type: 'int' }
    }, callback);
};

exports.down = function (db, callback) {
    db.dropTable('user', callback);
};

exports._meta = {
  "version": 1
};
