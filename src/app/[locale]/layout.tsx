import { NextIntlClientProvider, useMessages } from "next-intl";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Providers } from "@/@core/application/Providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahalla-U",
  description: "CRM-for Mahalla uyushmasi",
  icons: {
    icon: "/logoZip.webp",
  },
};

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) => {
  const messages = useMessages();

  return (
    <html lang={locale} className={inter.className}>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
