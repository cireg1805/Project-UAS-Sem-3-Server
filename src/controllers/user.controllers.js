const db = require("../database/dpuff.database");
const jwt = require('jsonwebtoken');

// Fungsi untuk menampilkan seluruh data user
const readUsers = async (req, res) => {
    try {
      const query = "SELECT * FROM user;";
      const data = await db.query(query);
      res.status(200).json({
        message: "get all users success",
        status: res.statusCode,
        users: data[0],
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "get all users fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk mencari data user secara spesifik
  const readUser = async (req, res) => {
    try {
      const id = req.params.id;
      const query = "SELECT * FROM user WHERE userID = ?;";
      const data = await db.query(query, [id]);
      // Melakukan pengecekan apabila tidak ada user yang ditemukan dengan ID yang dicari
      if (data[0].length === 0) {
        return res.status(404).json({
          message: "user with this ID is not exists",
          status: res.statusCode,
        });
      }
      res.status(200).json({
        message: "get user success",
        status: res.statusCode,
        user: data[0],
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "get user fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk membuat user profile yang baru
  const createUser = async (req, res) => {
    try {
      const { username, password} = req.body;
      // Memeriksa apakah seluruh atribut sudah terisi
      if (!username || !password) {
        return res.status(400).json({ // Kalau belum, kirim pesan bahwa seluruh atribut perlu diisi
          message: "username or password must be filled",
          status: res.statusCode,
        });
      }

      // Melakukan pengecekan apakah username yg ingin digunakan sudah ada atau tidak
      const checkQuery = "SELECT * FROM user WHERE username = ? ";
      const checkResult = await db.query(checkQuery, [username]);

      if (checkResult[0].length > 0) {
        return res.status(400).json({ // Kalau ada, kirim pesan bahwa username telah digunakan
          message: "username already in use",
          status: res.statusCode,
        });
      } 
      
      // Kalau tidak ada, ya lanjut
      const query =
        "INSERT INTO user(username, password) value(?,?)";
      await db.query(query, [username, password]);
      res.status(201).json({
        message: "create new user success",
        status: res.statusCode,
      });

    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: "create new user fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk mengupdate data user
  const updateUser = async (req, res) => {
    try {
      const { username, password} = req.body;
      const id = req.params.id;
      // Memeriksa apakah user dengan ID yang dicari ada atau tidak
      const checkQuery = "SELECT * FROM user WHERE userID = ?";
      const checkResult = await db.query(checkQuery, [id]);

      if (checkResult[0].length === 0) {
        return res.status(404).json({   // Kalau tidak ada, kirim respon "user not found"
          message: "user not found",
          status: res.statusCode,
        });
      };

      // Update yg dilakukan tidak boleh membuat atribut menjadi kosong
      if (!username || !password) {
        return res.status(400).json({
          message: "all required attributes must be filled",
          status: res.statusCode,
        });
      };

      // Melakukan pemeriksaan apakah atribut nama atau gambar yg menjadi pengganti sudah pernah dipakai atau belum
      const duplicateQuery =
      "SELECT * FROM user WHERE username = ? AND userID != ?";
      const duplicateResult = await db.query(duplicateQuery, [username, id]);

      if (duplicateResult[0].length > 0) {
        return res.status(400).json({ // Kalau sudah pernah, kirim pesan 404
          message: "username already exists",
          status: res.statusCode,
        });
      };

      const query =
        "UPDATE user SET username = ?, password = ? WHERE userID = ?";
      await db.query(query, [username, password, id]);
      res.status(200).json({
        message: "update user success",
        status: res.statusCode,
      });
    } catch (err) {
      res.status(400).json({
        message: "update user fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  // Fungsi untuk menghapus data user
  const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      // Memeriksa apakah user dengan ID yang dicari ada atau tidak
      const checkQuery = "SELECT * FROM user WHERE userID = ?";
      const checkResult = await db.query(checkQuery, [id]);

      if (checkResult[0].length === 0) {
        return res.status(404).json({   // Kalau tidak ada, kirim respon "user not found"
          message: "user not found",
          status: res.statusCode,
        });
      } 
      const query = "DELETE FROM user WHERE userID = ?";
      await db.query(query, [id]);
      res.status(200).json({
        message: "delete user success",
        status: res.statusCode,
      });
    } catch (err) {
      res.status(400).json({
        message: "delete user fail",
        statusCode: res.status,
        serverMessage: err,
      });
    }
  };

  const login = async (req, res) => {
    try {

      const { username, password } = req.body;
      const query = "SELECT * FROM user WHERE username = ? AND password = ?";
      const data = await db.query(query, [username, password]);

      // Melakukan pengecekan apakah data login sudah terisi semua apa belum
      if (!username || !password) {
        return res.status(400).json({ // Kalau belum, kasih respon error
          message: "username or password must be filled",
          status: res.statusCode,
        });
      }
  
      // Melakukan pengecekan krendesial di database
      if (data[0].length === 1) {
        // Jika kredensial benar, hasilkan token JWT
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

  module.exports = {
    readUsers,
    readUser,
    createUser,
    updateUser,
    deleteUser,
    login,
  };