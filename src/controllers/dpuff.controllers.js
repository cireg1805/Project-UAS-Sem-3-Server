// Memerlukan data dari database
const db = require("../database/dpuff.database");

// Gunakan json web token untuk autentikasi
const jwt = require('jsonwebtoken');

// Fungsi untuk mengambil data keseluruhan produk
const readProducts = async (req, res) => {
    try {
      const query = "SELECT * FROM produk;";
      const data = await db.query(query);
      res.status(200).json({
        message: "get all products success",
        status: res.statusCode,
        products: data[0],
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "get all products fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk mengambil salah satu data produk
  const readProduct = async (req, res) => {
    try {
      const id = req.params.id;
      const query = "SELECT * FROM produk WHERE id = ?;";
      const data = await db.query(query, [id]);
      // Melakukan pengecekan apabila tidak ada produk yang ditemukan dengan ID yang dicari
      if (data[0].length === 0) {
        return res.status(404).json({
          message: "Product not found",
          status: res.statusCode,
        });
      }
      // Apabila ada ditemukan
      res.status(200).json({
        message: "get product success",
        status: res.statusCode,
        product: data[0],
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "get product fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk membuat produk baru
  const createProduct = async (req, res) => {
    try {
      const { name, size, price, description, gambar} = req.body;
      // Memeriksa apakah seluruh atribut sudah terisi
      if (!name || !size || !price || !description || !gambar) {
        return res.status(400).json({ // Kalau belum, kirim pesan bahwa seluruh atribut perlu diisi
          message: "All required attributes must be filled",
          status: res.statusCode,
        });
      }
      // Melakukan pengecekan apakah produk yg ingin dibuat sudah ada atau tidak
      const checkQuery = "SELECT * FROM produk WHERE name = ? OR gambar = ?";
      const checkResult = await db.query(checkQuery, [name, gambar]);

      if (checkResult[0].length > 0) {
        return res.status(400).json({ // Kalau ada, kirim pesan bahwa produk tersebut sudah ada
          message: "Product with the same name or gambar already exists",
          status: res.statusCode,
        });
      } // Kalau tidak ada, ya lanjut proses
      const query =
        "INSERT INTO produk(name, size, price, description, gambar) value(?,?,?,?,?)";
      await db.query(query, [name, size, price, description, gambar]);
      res.status(201).json({
        message: "create product success",
        status: res.statusCode,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "create product fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk mengupdate produk yg sudah ada
  const updateProduct = async (req, res) => {
    try {
      const { name, size, price, description, gambar} = req.body;
      const id = req.params.id;
      // Memeriksa apakah produk dengan ID yang dicari ada atau tidak
      const checkQuery = "SELECT * FROM produk WHERE id = ?";
      const checkResult = await db.query(checkQuery, [id]);

      if (checkResult[0].length === 0) {
        return res.status(404).json({   // Kalau tidak ada, kirim respon "Product not found"
          message: "Product not found",
          status: res.statusCode,
        });
      } 

      // Update yg dilakukan tidak boleh membuat atribut menjadi kosong
      if (!name || !size || !price || !description || !gambar) {
        return res.status(400).json({
          message: "All required attributes must be filled",
          status: res.statusCode,
        });
      };

      // Melakukan pemeriksaan apakah atribut nama atau gambar yg menjadi pengganti sudah pernah dipakai atau belum
      const duplicateQuery =
      "SELECT * FROM produk WHERE (name = ? OR gambar = ?) AND id != ?";
      const duplicateResult = await db.query(duplicateQuery, [name, gambar, id]);

      if (duplicateResult[0].length > 0) {
        return res.status(400).json({ // Kalau sudah pernah, kirim pesan 404
          message: "Product with the same name or image already exists",
          status: res.statusCode,
        });
      };

      // Setelah melewati tahap pengecekan
      const query =
        "UPDATE produk SET name = ?, size = ?, price = ?, description = ?, gambar = ? WHERE id =?";
      await db.query(query, [name, size, price, description, gambar, id]);
      res.status(200).json({
        message: "updated product success",
        status: res.statusCode,
      });
    } catch (err) {
      res.status(400).json({
        message: "updated product fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk menghapus produk yg sudah ada
  const deleteProduct = async (req, res) => {
    try {
      const id = req.params.id;
      // Memeriksa apakah produk yang ingin dihapus ada atau tidak
      const checkQuery = "SELECT * FROM produk WHERE id = ?";
      const checkResult = await db.query(checkQuery, [id]);

      if (checkResult[0].length === 0) {
      return res.status(404).json({   // Kalau tidak ada, kirim respon "Product not found"
        message: "Product not found",
        status: res.statusCode,
      });

    } // Kalau ada ya lanjut
      const query = "DELETE FROM produk WHERE id=?";
      await db.query(query, [id]);
      res.status(200).json({
        message: "delete product success",
        status: res.statusCode,
      });
    } catch (err) {
      res.status(400).json({
        message: "delete product fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi Untuk Melakukan Login
  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Melakukan pemeriksaan username serta password di database
      const query = "SELECT * FROM user WHERE username = ? AND password = ?";
      const data = await db.query(query, [username, password]);
  
      if (data[0].length === 1) {
        // Jika username serta password yg disertakan benar, hasilkan token JWT
        const token = jwt.sign({ username }, "secret-key");
  
        res.status(200).json({
          message: "Login berhasil",
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Login gagal - kredensial tidak valid",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Login gagal",
        serverMessage: err,
      });
    }
  };
  
  // Export seluruh fungsi
  module.exports = {
    readProducts,
    readProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    login,
  };