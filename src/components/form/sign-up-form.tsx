"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { SignUpFormSchema } from "@/schema/form-schema";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { User } from "@/types";

export function SignUpForm({
  className,
  asCard = true,
  showSignInButton = true,
  isEditForm = false,
  userData,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  asCard?: boolean;
  showSignInButton?: boolean;
  isEditForm?: boolean;
  userData?: User;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    try {
      console.log(values);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues:
      isEditForm && userData
        ? { ...userData, confirmPassword: userData.password }
        : {
            name: "",
            address: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
          },
  });

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card
        className={cn("border-0", asCard && "shadow shadow-card-foreground/25")}
      >
        {asCard && (
          <CardHeader>
            <CardTitle className="text-2xl">Daftar</CardTitle>
            <CardDescription>
              Harap isi data dengan lengkap dan bebar untuk daftar ke sistem ini
            </CardDescription>
          </CardHeader>
        )}
        <CardContent className={cn(!asCard && "p-0")}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Smitty Werben Jagger Man Jansen"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Nama untuk menampilkan identitas
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Alamat</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Jalan Sesama Nomor 86"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Alamat rumah untuk verifikasi
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Nomor Telepon</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="081200000000"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Nomor telepon untuk verifikasi
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="smitty.werben@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Email untuk masuk ke dalam sistem
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div>
                            <div className="relative">
                              <Input
                                placeholder="*****"
                                {...field}
                                type={showPassword ? "text" : "password"}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Password untuk masuk ke dalam sistem
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Konfirmasi Password</FormLabel>
                        <FormControl>
                          <div>
                            <div className="relative">
                              <Input
                                placeholder="*****"
                                {...field}
                                type={showPassword ? "text" : "password"}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Password harus sama dengan diatas
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-6">
                {isEditForm ? "Ubah" : "Daftar"}
              </Button>
              {showSignInButton && (
                <Link
                  href="/sign-in"
                  className="flex mx-auto text-center text-sm underline underline-offset-4"
                >
                  Masuk Sekarang
                </Link>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
