import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../graphql/db";
import userModel from "../../graphql/models/userModel";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await userModel.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { id: user._id, email: user.email, username: user.username },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
