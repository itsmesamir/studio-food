import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import db from "../db";

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  const user: User | undefined = await db<User>("users")
    .where({ email })
    .first();
  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  const token: string = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1h",
    }
  );

  res.json({ token });
};
