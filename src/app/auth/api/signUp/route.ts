

import axios from "axios";
import { signInInputs, signUpInputs } from "../../../_interfaces/sign-type";
import { log } from "console";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
 
  try {
    const data: signUpInputs = await req.json();

    const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`, {
      client_id: process.env.AUTH0_CLIENT_ID,
      email: data.email,
      password: data.password,
      connection: "Username-Password-Authentication",
      username: data.username,
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });



    return NextResponse.json({ success: true, message: "Sign-up" });
  } catch (error: any) {
    console.error("Error during sign-up:", error);

    // Return a custom error message
    return NextResponse.json({ success: false, message: "Sign-up failed. Please try again." });
  }
}





