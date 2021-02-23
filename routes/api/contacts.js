const express = require("express");
const router = express.Router();
const Contacts = require("../../model/contacts");

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, name, number } = req.body;
    if (email && name && number) {
      await Contacts.addContact(req.body);
      return res.status(201).json({
        status: "success",
        code: 201,
        data: {
          email,
          name,
          number,
        },
      });
    } else {
      return res.status(400).json({
        status: "error",
        code: 400,
        data: { message: "missing required name field" },
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: { message: "contact deleted" },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, email, number } = await Contacts.updateContact(
      req.params.id,
      req.body
    );

    if (name || email || number) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          name,
          email,
          number,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/number", async (req, res, next) => {
  try {
    const { number } = await Contacts.updateContact(req.params.id, req.body);

    if (number) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          number,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
