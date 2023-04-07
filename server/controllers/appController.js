import bcrypt from 'bcrypt';
import UserModel from '../model/User.model.js';


/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
  try {
    const { email, password, profile, username } = req.body;

    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) return reject(err);
        if (email) return reject({ error: "Email already exists" });
        resolve();
      });
    });

    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) return reject(err);
        if (user) return reject({ error: "Username already exists" });
        resolve();
      });
    });

    Promise.all([existEmail, existUsername])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                email,
                password: hashedPassword,
                profile: profile || "",
                username,
              });

              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: "User Registered Successfully" })
                )
                .catch((error) =>
                  res.status(500).send({ msg: "Unable to save new user" })
                );
            })
            .catch((error) => {
              return res.status(500).send({
                error: "Unable to hash password",
              });
            });
        } else {
          return res
            .status(400)
            .send({ error: "Password is required to register" });
        }
      })
      .catch((error) => {
        if (error.hasOwnProperty("error")) {
          return res.status(400).send({ error: error.error });
        } else {
          return res
            .status(500)
            .send({ msg: "Error encountered while verifying email or username" });
        }
      });
  } catch (error) {
    return res.status(500).send({ msg: "Invalid Request::500" });
  }
}



/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
export async function login(req, res) {
  res.json('login route');
}


/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
  res.json('getUser route');
}


/** GET: http://localhost:8080/api/updateUser/ */
export async function updateUser(req, res) {
  res.json('updateUser route');
}


/** GET: http://localhost:8080/api/gernerateOTP/ */
export async function gernerateOTP(req, res) {
  res.json('gernerateOTP route');
}


/** GET: http://localhost:8080/api/verifyOTP/ */
export async function verifyOTP(req, res) {
  res.json('verifyOTP route');
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession/ */
export async function createResetSession(req, res) {
  res.json('createResetSession route');
}


/** GET: http://localhost:8080/api/resetPassword/ */
export async function resetPassword(req, res) {
  res.json('resetPassword route');
}