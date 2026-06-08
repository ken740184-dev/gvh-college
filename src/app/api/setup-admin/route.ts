import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    await connectToDatabase();

    const email = "ekbotesushilendr0@gmail.com";
    const password = "sushil3011";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return NextResponse.json({ message: "Admin already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name: "Sushil (Master Admin)",
      email,
      password: hashedPassword,
      role: "admin",
    });

    return NextResponse.json({
      message: "Admin created successfully!",
      admin: { name: newAdmin.name, email: newAdmin.email },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create admin" }, { status: 500 });
  }
}
