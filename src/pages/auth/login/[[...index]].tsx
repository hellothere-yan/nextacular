import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn path="/auth/login" routing="path" signUpUrl="/auth/signup "/>
    </div>
  );
}
