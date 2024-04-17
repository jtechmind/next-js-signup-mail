import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectMongoDb } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectMongoDb();

export async function POST(request: NextRequest) {
  try {
    // extract data from token
    const userInfo = await getDataFromToken(request);
    const user = User.findOne({ _id: userInfo }).select("_password");

    if (!user) {
      return NextResponse.json({ message: "User Not Found" });
    }
    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
