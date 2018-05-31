const User = require('../models/user');
/**
 * @module User
 */
module.exports = {
  profile: (req, res) => {
    res.json({
      user: req.user,
    });
  },

  /**
   * összes regisztrált felhasználó listázása
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   */
  listAll: (req, res) => {
    User.find({}, (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    });
  },

  /**
   * felhasználói jogosultság beállítása
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, a kért adatokat visszakapjuk egy objektumban.
   */
  register: (req, res) => {
    User.register(new User({
        username: req.body.username,
        email: req.body.email,
        rights: req.body.rights,
      }), req.body.password)
      .then(user => res.json(user))
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  },
  /**
   * Egyszerű login
   * @param {String} req - A kérés.
   * @param {Object} res - Ha nem történt hiba, akkor a függvény visszaküldi
   * az adott felhasználó adatait.
   */
  login: (req, res) => res.json({
    login: true,
  }),
  /**
   * És logout
   * @param {String} req - A kérés meghívja a logout(), beépített metódust.
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a success tulajdonságot
   */
  logout: (req, res) => {
    req.logout();
    res.status(200).json({
      success: 'Done',
    });
  },
  /**
   * felhasználó törlése
   * @param {String} req - A kérés a felhasználó azonosítóját állítja be.
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a 200-as kódot,
   * és a success tulajdonságot
   * */
  remove: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(200).json({
          success: 'Done',
        });
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  /**
   * Update felhasználó
   * @param {String} req - A kérés a felhasználó azonosítóját és fő adatait kéri
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a frissített adatokat.
   */
  /** Jelszómódosítás
   * Megváltoztatja a felhasználó jelszavát.
   * Feltétele, hogy a felhasználó be legyen jelentkezve, és helyesen adja meg a régi jelszót.
   * @param {Object} req - HTTP request objektum
   * @param {Object} res - HTTP response objektum
   * @returns {Object} - sikeres jelszóváltoztatás esetén success tulajdonságú objektumot ad vissza,
   * hiba esetén err tulajdonságú objektumot küld
   */
  update: (req, res) => {
    req.body.updatedAt = new Date().toLocaleDateString();
    User.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (req.body.update === true) {
        post.changePassword(req.body.oldPassword, req.body.newPassword, () => {
          post.save();
        });
      }
      if (err) {
        res.send(err);
        console.log(err);
      }
      res.json(post);
    });
  },

  /**
   * Egy bizonyos felhasználó keresése
   * @param {String} req - A kérés a felhasználó azonosítóját állítja be.
   * @param {Object} res - Ha nem történt hiba, a függvény visszaküldi a 200-as kódot és a
   * keresett felhasználót.
   */
  getOne: (req, res, next) => {
    User.findById(req.params.id)
      .then((userFound) => {
        if (!userFound) {
          return res.status(404).end();
        }
        return res.status(200).json(userFound);
      })
      .catch(err => next(err));
  },


};