"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadcrumbPath() {
  const pathname = usePathname();

  const paths = pathname.split("/").filter((segment) => segment);

  const translations: Record<string, string> = {
    dashboard: "Beranda",
    payments: "Pembayaran",
    approvals: "Persetujuan",
    refunds: "Pengembalian",
    reports: "Laporan",
    users: "Pengguna",
    informations: "Informasi",
    contacts: "Kontak",
    settings: "Pengaturan",
  };

  const translateSegment = (segment: string): string => {
    return translations[segment] || segment;
  };

  return (
    pathname !== "/dashboard" && (
      <div className="flex items-center gap-2 px-4 pt-4">
        <Breadcrumb>
          <BreadcrumbList>
            {paths.map((segment, index) => {
              const href = "/" + paths.slice(0, index + 1).join("/");
              const isLast = index === paths.length - 1;

              return (
                <Fragment key={href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <p>{translateSegment(segment)}</p>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href}>{translateSegment(segment)}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    )
  );
}
