import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import mongoose from "mongoose";

const roboto = Roboto({ subsets: ["latin"], weight: ['400', '500', '700'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
let mongoPassword = encodeURIComponent(process.env.NEXT_PUBLIC_MONGO_PASSWORD);
console.log(`mongodb+srv://asayushsharma1111:${mongoPassword}@cluster0.fsj3dq9.mongodb.net/`)
let connection = await mongoose.connect(`mongodb+srv://asayushsharma1111:${mongoPassword}@cluster0.fsj3dq9.mongodb.net/`);
if(connection) console.log('connected to db')

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
          <Header />
          {children}
          <footer className="mt-12 text-center text-gray-500">
            <hr className="mb-6" />
            &copy; 2024 All rights reserved
          </footer>
        </main>
      </body>
    </html>
  );
}
