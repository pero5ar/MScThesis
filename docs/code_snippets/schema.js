const mongoose = require('mongoose');

// KORISNIK:
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  tokenTimestamp: Number,
  type: String,
  firstName: String,
  lastName: String,
  personalData: Object,
  studentData: Object, // has a defined Schema
  teacherData: Object, // has a defined Schema
  exercisesAttemptedIds: [mongoose.Schema.Types.ObjectId],
  exercisesCompletedIds: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });
const userModel = mongoose.model('User', userSchema);

// ZADATAK:
const tableSchema = new mongoose.Schema({
  keys: [String],
  rows: [Object],
}, { _id: false });
const exerciseSchema = new mongoose.Schema({
  code: String,
  title: String,
  description: String,
  input: tableSchema,
  output: tableSchema,
  isOutputRowOrderImportant: Boolean,
  usersAttemptedIds: [mongoose.Schema.Types.ObjectId],
  usersCompletedIds: [mongoose.Schema.Types.ObjectId],
  createdById: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });
const exerciseModel = mongoose.model('Exercise', exerciseSchema);

// POKUŠAJ
const stateSchema = new mongoose.Schema({
  diagramState: Object,
  serializedGraph: String,
  timestamp: Date,
}, { _id: false });
const attemptSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  exerciseId: mongoose.Schema.Types.ObjectId,
  isSuccessful: Boolean,
  beginState: stateSchema,
  endState: stateSchema,
  currentState: stateSchema,
  states: [stateSchema],
  previousAttemptId: mongoose.Schema.Types.ObjectId,
  nextAttemptId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });
const attemptModel = mongoose.model('Attempt', attemptSchema);
