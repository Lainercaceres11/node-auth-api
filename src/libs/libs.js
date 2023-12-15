import jwt from "jsonwebtoken";

function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    //Generamos JWT
    jwt.sign(
      payload,
      "secret1234",
      { expiresIn: "1d" },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    );
  });
}

export default createAccesToken
