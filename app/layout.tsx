import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Remindo",
  description: "A simple reminder app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.className, "dark")}
      style={{
        colorScheme: "dark",
      }}
    >
      <body>
        <Providers>
          <ThemeProvider>
            <div className="flex min-h-screen w-full flex-col items-center dark:bg-black">
              <NavBar />
              <Separator />
              <main className="flex flex-grow w-full justify-center items-center dark:bg-neutral-950">
                {children}
              </main>
              <Toaster/>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
