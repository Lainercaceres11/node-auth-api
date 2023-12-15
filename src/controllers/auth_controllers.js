import { request, response } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

import createAccesToken from "../libs/libs.js";
import jwt from "jsonwebtoken";

const register = async (req = request, res = response) => {
  const { username, email, password } = req.body;

  try {

    const userFound = await userModel.findOne({email})

    if(userFound){
      return res.status(400).json(["Email is Already"])
    }
    //Encriptamos contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    //Creamos instancia de usuario
    const newUser = new userModel({ username, email, password: passwordHash });

    //Gurdamos usuario
    const userSaved = await newUser.save();

    const token = await createAccesToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("No se pudo guardar el usuario");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await userModel.findOne({ email });

    if (!userFound) return res.status(400).json(["No existe el email" ]);

    //comparamos contraseña
    const isMath = await bcrypt.compare(password, userFound.password);

    if (!isMath) return res.status(400).json([ "Invalid password" ]);

    const token = await createAccesToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("No se pudo guardar el usuario");
  }
};

const logout = (req = request, res = response) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.status(200).send("Logout site");
};

const profile = async (req, res)=>{
  const userFound = await userModel.findById(req.user.id)

  if(!userFound) return res.status(400).json({message: "User no found"})

  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email
  })

}

const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["No autorizado"]);

  jwt.verify(token, "secret1234", async (err, user) => {
    if (err) return res.status(401).json(["No autorizado"]);

    const userFound = await userModel.findById(user.id);
    if (!userFound) return res.status(401).json(["No autorizado"]);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

export { register, login, logout, profile, verifyToken };
