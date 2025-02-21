import { SignUpForm } from "@/components/form/sign-up-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full lg:max-w-xl sm:max-w-xs">
        <SignUpForm />
      </div>
    </div>
  );
}
