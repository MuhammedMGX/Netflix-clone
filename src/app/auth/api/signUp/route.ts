

import axios from "axios";
import { signInInputs, signUpInputs } from "../../../_interfaces/sign-type";
import { log } from "console";
import { NextResponse } from "next/server";

console.log("AUTH0_DOMAIN:", process.env.AUTH0_DOMAIN);
console.log("AUTH0_CLIENT_ID:", process.env.AUTH0_CLIENT_ID);


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

    console.log("Response from Auth0:", response);


    return NextResponse.json({ success: true, message: "Sign-up" });
  } catch (error: any) {
    console.error("Error during sign-up:", error);

    // Return a custom error message
    return NextResponse.json({ success: false, message: "Sign-up failed. Please try again." });
  }
}





