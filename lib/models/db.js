import mongoose from 'mongoose';
import config from '../config/config';

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, {useMongoClient: true});

const db = mongoose.connection;

db.on('connected',function() {
  console.log('connected to database');
});

db.on('disconnected',function() {
  console.log('disconnected from database');
});

db.on('error',function(e) {
  console.log('database error:',e);
});

// close mongoose db if Node process end
process.on('SIGINT', function() {
  db.close(function() {
    console.log('closed db of mongoose');
  });
  process.exit(0);
});

export default db;
