const db = require("../config/db");

exports.createBusiness = (req, res) => {
  const { name, phone, email, tax_type } = req.body;

  if (!name) {
    return res.status(400).json({"message": "Business name is required"});
  }

  db.query(
    "SELECT id FROM businesses WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (results.length) {
        return res.status(409).json({"message": "Business already exists"});
      }

      db.query(
        "INSERT INTO businesses (user_id, name, phone, email, tax_type) VALUES (?, ?, ?, ?, ?)",
        [req.user.id, name, phone, email, tax_type],
        (err) => {
          if (err) return res.status(500).json({"message": "Failed to create business"});
          res.status(201).json({"message": "Business created"});
        }
      );
    }
  );
};

exports.getMyBusiness = (req, res) => {
  db.query(
    "SELECT * FROM businesses WHERE user_id = ?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({"message": "Error fetching business"});
      res.json(results[0] || null);
    }
  );
};


exports.uploadBusinessLogo = async (req, res) => {
  const { business_id } = req.params;
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({"message": "No file uploaded"});
  }

  try {
    // Verify ownership
    const [business] = await db.promise().query(
      "SELECT id FROM businesses WHERE id = ? AND user_id = ?",
      [business_id, userId]
    );

    if (!business.length) {
      return res.status(403).json("Unauthorized");
    }

    const logoUrl = `/uploads/logos/${req.file.filename}`;

    await db.promise().query(
      "UPDATE businesses SET logo_url = ? WHERE id = ?",
      [logoUrl, business_id]
    );

    res.json({
      message: "Logo uploaded successfully",
      logo_url: logoUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({"message": "Failed to upload logo"});
  }
};
