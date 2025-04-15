import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Votaciones - Vota en línea por tu candidato preferido en CGAO",
  description: "Vota en línea por tu candidato de la jornada preferido en el Centro de gestión agroempresarial del oriente (CGAO, SENA)", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/svg+xml" href="./logo-sena.svg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
