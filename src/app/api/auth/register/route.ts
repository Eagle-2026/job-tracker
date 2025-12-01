import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { signupSchema } from "@/utils/validateUser";

export async function POST(req: NextRequest) {
  try {
  // 📥 Step 1: Read the incoming request body as JSON.
  // Next.js API routes receive the HTTP request object (req), 
  // so we use req.json() to extract the data sent by the client (e.g., email, password).
  const body = await req.json();

  // 🧠 Step 2: Validate the data using Zod schema.
  // The `signupSchema` defines what a valid signup body should look like
  // (must include email and password with proper format and length).
  const parsed = signupSchema.safeParse(body);

  // ⚠️ Step 3: If validation fails, `parsed.success` will be false.
  // We extract the first error message and return it to the client with HTTP status 400 (Bad Request).
  if (!parsed.success) {
    const msg = parsed.error.issues[0].message; // first Zod error message
    return NextResponse.json({ message: msg }, { status: 400 });
  }

  // ✅ Step 4: If validation succeeds, extract the clean and typed data from parsed.data.
  // Zod automatically ensures it's in the right format, so now it's safe to use. This line takes the validated, safe data from Zod and makes email and password easy-to-use variables for the rest of your code:-
  const {name, email, password } = parsed.data; 

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 400 }
      );
    }
    const hashPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });
    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
