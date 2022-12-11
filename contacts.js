const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);
    console.log("List of contacts: ");
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    const contact = contacts.find((contact) => {
      if (contact.id === contactId) {
        console.log(`Get contact by ID ${contactId}:`);
        console.table(contact);
        return contact;
      }
    });

    if (contact == null) {
      return console.log(`Your contact "${contactId}" not found!`);
    }
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error.message);
    }

    const contacts = JSON.parse(data);
    const newContactCollections = contacts.filter(
      (contact) => contact.id !== contactId
    );

    if (newContactCollections.length === contacts.length) {
      console.log(
        `Contact ${contactId} didnt removed! ${contactId} not found!`
      );
      return;
    }

    console.log("Contact deleted successfully! New list of contacts: ");
    console.table(newContactCollections);

    fs.writeFile(
      contactsPath,
      JSON.stringify(newContactCollections),
      (error) => {
        if (error) {
          return console.log(error);
        }
      }
    );
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    const contacts = JSON.parse(data);

    contacts.push({
      id: contacts.length + 1,
      name: name,
      email: email,
      phone: phone,
    })
    

    console.log(`"${name}" successfully added! Your new contact list: `);
    console.table(contacts);

fs.writeFile(contactsPath, JSON.stringify(contacts), (error) => {
  if (error) {
    return console.log(error);
  }
});

  });
    }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
