"use client";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Timer, Trash, Upload, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaymentConfirmationFormSchema } from "@/schema/form-schema";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Payment, Status } from "@/types";

export default function CreateInvoiceForm({
  asCard = true,
  isEditForm = false,
  showInfo = true,
  paymentData,
}: {
  asCard?: boolean;
  isEditForm?: boolean;
  showInfo?: boolean;
  paymentData?: Payment;
}) {
  const imageRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [useAccount, setUseAccount] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(false);

  const router = useRouter();

  function onSubmit(values: z.infer<typeof PaymentConfirmationFormSchema>) {
    try {
      console.log(values);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const form = useForm<z.infer<typeof PaymentConfirmationFormSchema>>({
    resolver: zodResolver(PaymentConfirmationFormSchema),
    defaultValues:
      isEditForm && paymentData
        ? { ...paymentData }
        : {
            name: "",
            description: "",
            method: "",
            accountNumber: 0,
            amount: 0,
            date: undefined,
            image: undefined,
          },
  });

  useEffect(() => {
    if (paymentData?.image) setPreviewImage(paymentData?.image);
  }, [paymentData?.image]);

  const onClickInput = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);

      console.log("imageURL: ", imageUrl);
      console.log("file: ", file);

      setPreviewImage(imageUrl);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="grid lg:grid-cols-3 max-sm:grid-cols-1 justify-between gap-4">
          <div className="flex flex-col gap-4 col-span-2 max-sm:max-w-sm">
            {showInfo && (
              <Alert className="bg-yellow-300/50">
                <div className="flex flex-row items-center gap-3">
                  <div className="p-2 bg-yellow-500 rounded-full">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <AlertTitle>Perhatian</AlertTitle>
                    <AlertDescription>
                      Pastikan sudah melakukan transaksi pembayaran. Terimakasih
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            )}
            {showInfo && (
              <Card
                className={cn(
                  "border-0",
                  asCard && "shadow shadow-card-foreground/25"
                )}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">Akun Saya</CardTitle>
                  <CardDescription>
                    Berikut ini adalah data akun yang digunakan saat ini untuk
                    masuk ke dalam sistem
                  </CardDescription>
                </CardHeader>
                <CardContent
                  className={cn("flex flex-col gap-4", !asCard && "p-0")}
                >
                  <Separator />
                  <div className="flex flex-row gap-4 justify-between">
                    <div className="flex flex-col basis-1/3 gap-2">
                      <span className="text-sm font-light">Nama</span>
                      <span className="text-lg font-bold break-all">
                        Nailul Firdaus
                      </span>
                    </div>
                    <div className="flex flex-col basis-1/3 gap-2">
                      <span className="text-sm font-light">Nomor Telepon</span>
                      <span className="text-lg font-bold break-all">
                        081200000000
                      </span>
                    </div>
                    <div className="flex flex-col basis-1/3 gap-2">
                      <span className="text-sm font-light">Email</span>
                      <span className="text-lg font-bold break-all">
                        nailul.firdaus@gmail.com
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            <div className="flex flex-col gap-4">
              <Card
                className={cn(
                  "border-0",
                  asCard && "shadow shadow-card-foreground/25"
                )}
              >
                {asCard && (
                  <>
                    <CardHeader>
                      <CardTitle className="text-2xl">
                        Detail Pembayaran
                      </CardTitle>
                      <CardDescription>
                        Harap isi data dengan lengkap dan bebar untuk daftar ke
                        sistem ini
                      </CardDescription>
                    </CardHeader>
                    <Separator />
                  </>
                )}
                <CardContent
                  className={cn("flex flex-col gap-4", !asCard && "p-0")}
                >
                  {!isEditForm && (
                    <div className="flex space-x-2 my-4">
                      <Checkbox
                        id="setAccount"
                        checked={useAccount}
                        onCheckedChange={() => setUseAccount(!useAccount)}
                      />
                      <label
                        htmlFor="setAccount"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nama pengirim sama dengan nama akun
                      </label>
                    </div>
                  )}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Smitty Werben Jagger Man Jansen"
                            value={useAccount ? "Nailul Firdaus" : field.value}
                            disabled={useAccount}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Nama rekening pengirim
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Rekening</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="14045140223000"
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Nomor rekening pengirim
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Transfer Bank"
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Deskripsi transaksi pembayaran
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="method"
                    render={({ field }) => {
                      const paymentMethod = [
                        "QRIS",
                        "Transfer Bank",
                        "E-Wallet",
                      ];

                      return (
                        <FormItem className="grid gap-2">
                          <FormLabel>Metode</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={cn(
                                  !paymentData?.method &&
                                    "text-muted-foreground"
                                )}
                              >
                                <SelectValue placeholder="Pilih metode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentMethod.map((item, index) => (
                                <SelectItem key={index} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormDescription className="text-xs">
                            Metode transaksi pembayaran
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Nominal</FormLabel>
                        <FormControl>
                          <div>
                            <div className="relative">
                              <p className="absolute rounded px-2 left-2 top-1/2 -translate-y-1/2 h-6 w-10 bg-input">
                                IDR
                              </p>
                              <Input
                                {...field}
                                className="pl-14"
                                type="number"
                                placeholder="999999999"
                                value={field.value}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs">
                          Nominal transaksi pembayaran
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel>Tanggal</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[240px] pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: id })
                                ) : (
                                  <span>Pilih tanggal</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className="text-xs">
                          Tanggal setelah melakukan transaksi pembayaran
                        </FormDescription>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-4 max-sm:col-span-2 max-sm:max-w-sm">
            <Card
              className={cn(
                "border-0",
                asCard && "shadow shadow-card-foreground/25"
              )}
            >
              <CardHeader className={cn(!asCard && "p-0")}>
                <CardTitle className="text-2xl break-words">
                  Bukti Pembayaran
                </CardTitle>
                <CardDescription>
                  Pilih bukti pembayaran yang telah dilakukan
                </CardDescription>
              </CardHeader>
              <CardContent
                className={cn("flex flex-col gap-4", !asCard && "px-0 py-2")}
              >
                <Separator />
                {previewImage ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative border rounded border-dashed">
                          <Image
                            alt="image"
                            className="aspect-auto w-full rounded object-cover"
                            height="300"
                            width="300"
                            src={previewImage}
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute left-1/2 -translate-x-1/2 -bottom-4"
                            onClick={() => setPreviewImage("")}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Hapus</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={onClickInput}
                      className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                    <input
                      ref={imageRef}
                      onChange={onChangeInput}
                      type="file"
                      name="image"
                      className="hidden"
                      accept="images/*"
                      multiple={false}
                    />
                  </>
                )}
              </CardContent>
            </Card>
            <Card
              className={cn(
                "border-0",
                asCard && "shadow shadow-card-foreground/25"
              )}
            >
              <CardContent className={cn(!asCard && "p-0")}>
                {isEditForm ? (
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => {
                      const paymentStatus: Status[] = [
                        {
                          name: "disetujui",
                          icon: CheckCircle,
                        },
                        {
                          name: "ditolak",
                          icon: XCircle,
                        },
                        {
                          name: "ditunda",
                          icon: Timer,
                        },
                      ];

                      return (
                        <FormItem className="grid gap-2 my-4">
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={cn(
                                  !paymentData?.status &&
                                    "text-muted-foreground"
                                )}
                              >
                                <SelectValue placeholder="Pilih metode" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {paymentStatus.map((item, index) => (
                                <SelectItem key={index} value={item.name}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-xs">
                            Metode transaksi pembayaran
                          </FormDescription>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      );
                    }}
                  />
                ) : (
                  <>
                    <div className="flex space-x-2 my-4">
                      <Checkbox
                        id="acceptTNC"
                        checked={valid}
                        onCheckedChange={() => setValid(!valid)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="acceptTNC"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Setuju
                        </label>
                        <p className="text-sm text-muted-foreground">
                          Saya menyatakan bahwa data sudah diisi dengan lengkap
                          dan benar
                        </p>
                      </div>
                    </div>
                    <Separator />
                  </>
                )}
                <Button
                  type="submit"
                  className={cn("w-full", !isEditForm && "mt-6")}
                  disabled={!valid && !isEditForm}
                >
                  Kirim
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
