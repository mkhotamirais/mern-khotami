import { compareSync, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { at } from "../config/constants.js";

export const ok = (res, status, message, data) => {
  res.status(status).json({ message, data });
};

export const err = (res, status, error) => {
  res.status(status).json({ message: error?.message || error });
};

export const hashPass = (pass) => {
  const salt = genSaltSync(10);
  return hashSync(pass, salt);
};

export const comparePass = (pass, oldPass) => {
  return compareSync(pass, oldPass);
};

export const setToken = (data) => jwt.sign(data, at, { expiresIn: "3d" });

export const setCookie = (res, name, token) => {
  res.cookie(`${name}`, token, {
    secure: true,
    httpOnly: true,
    // maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "none",
    path: "/",
  });
};

export const removeCookie = (res, name) => {
  res.clearCookie(`${name}`, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    // expires: new Date(0),
    path: "/",
  });
};
