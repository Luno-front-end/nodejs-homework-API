// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
// const db = require("./db");
// const { ObjectID } = require("mongodb");

// const getCollection = async (db, name) => {
//   const client = await db;
//   const collection = await client.db().collection(name);
//   return collection;
// };
const contact = require("./schema/contact");

const listContacts = async () => {
  // const collection = await getCollection(db, "contacts");

  const results = await contact.find({});
  return results;
};

const getContactById = async (id) => {
  // const collection = await getCollection(db, "contacts");
  // const objectId = new ObjectID(id);

  const result = await contact.findOne({ _id: id });
  return result;
};

const addContact = async (body) => {
  // const record = {
  //   ...body,
  // };
  // const collection = await getCollection(db, "contacts");

  // const {
  //   ops: [result],
  // } = await collection.insertOne(record);
  const result = await contact.create(body);
  return result;
};

const updateContact = async (id, body) => {
  // const collection = await getCollection(db, "contacts");
  // const objectId = new ObjectID(id);
  const result = await contact.findByIdAndUpdate(
    { _id: id },
    { ...body },
    { new: true }
  );
  return result;
};

const removeContact = async (id) => {
  // const collection = await getCollection(db, "contacts");
  // const objectId = new ObjectID(id);

  const result = await contact.findByIdAndRemove({
    _id: id,
  });
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
