import { SignInForm } from "@/components/form/sign-in-form";

export default function SignInPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full lg:max-w-lg sm:max-w-xs">
        <SignInForm />
      </div>
    </div>
  );
}
