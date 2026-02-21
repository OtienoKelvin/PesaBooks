const db = require("../config/db");

exports.createClient = (req, res) => {
  const { first_name, last_name, email, phone, address } = req.body;

  db.query(
    "SELECT id FROM businesses WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (!results.length) return res.status(400).json({"message": "Create business first"});

      const businessId = results[0].id;

      db.query(
        "INSERT INTO clients (business_id, first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?, ?)",
        [businessId, first_name, last_name, email, phone, address],
        (err) => {
          if (err) return res.status(500).json({"message": "Failed to add client"});
          res.status(201).json({"message": "Client added"});
        }
      );
    }
  );
};

exports.getClients = (req, res) => {
  db.query(
    `
    SELECT c.* FROM clients c
    JOIN businesses b ON c.business_id = b.id
    WHERE b.user_id = ?
    `,
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({"message": "Failed to fetch clients"});
      res.json(results);
    }
  );
};

exports.updateClient = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, address } = req.body;

  db.query(
    `
    UPDATE clients c
    JOIN businesses b ON c.business_id = b.id
    SET first_name=?, last_name=?, email=?, phone=?, address=?
    WHERE c.id=? AND b.user_id=?
    `,
    [first_name, last_name, email, phone, address, id, req.user.id],
    (err, result) => {
      if (!result.affectedRows) return res.status(404).json({"message": "Client not found"});
      res.json({"message": "Client updated"});
    }
  );
};

exports.deleteClient = (req, res) => {
  const { id } = req.params;

  db.query(
    `
    DELETE c FROM clients c
    JOIN businesses b ON c.business_id = b.id
    WHERE c.id=? AND b.user_id=?
    `,
    [id, req.user.id],
    (err, result) => {
      if (!result.affectedRows) return res.status(404).json({"message": "Client not found"});
      res.json({"message": "Client deleted"});
    }
  );
};
