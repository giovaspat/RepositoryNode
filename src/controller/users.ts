import * as dotenv from "dotenv"
dotenv.config()
import { Request, Response } from "express";
import { db } from "../db.js";
import jwt from "jsonwebtoken"

const logIn = async(req: Request, res: Response) => {
  const {username, password} = req.body;

  const user = await db.one(`SELECT * FROM users WHERE username=$1`, username)

  if (user && user.password === password) {
    const payload = {
      id: user.id,
      username,
    };

    const SECRET: string = process.env.SECRET || "fallbackSecret";
    const token = jwt.sign(payload, SECRET)
    console.log(SECRET)
    console.log(token)

    await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user.id, token])
    res.status(200).json({id:user.id, username, token});
  } else {
    res.status(400).json({msg : "username or password not correct"});
  }
}


const signUp = async(req: Request, res: Response) => {
  const {username, password} = req.body;

  const user = await db.oneOrNone(`SELECT * FROM users WHERE username=$1`, username)

  if (user) {
    res.status(409).json({msg : "username already in use"});
  } else {
    const {id} = await db.one( `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`,[username, password]);
    res.status(201).json({id, msg : "username created successfully"});
  }

}


const logOut = async(req: Request, res: Response) => {
  const {username, password} = req.body;
  const user: any = req.user;
  await db.none(`UPDATE users SET token=$2 WHERE id=$1`, [user?.id, null])
  res.status(200).json({msg : "logout successful"});

}


export {logIn,signUp,logOut};