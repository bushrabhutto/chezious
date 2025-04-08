
import "./globals.css";
import NavigationBar from "@/NavigationBar/page";
import Footer from "@/Footer/page";
import { CartProvider } from "@/context/CartContext";





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
       
      >   <CartProvider>
      <NavigationBar />
    
        {children}
   <Footer/>
   </CartProvider>
      </body>
    </html>
  );
}
