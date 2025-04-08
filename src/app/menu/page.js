import { Suspense } from "react";
import MenuClient from "./MenuClient";

const MenuPage = () => {
  return (
    <Suspense fallback={<div className="text-center py-8">Loading Menu...</div>}>
      <MenuClient />
    </Suspense>
  );
};

export default MenuPage;
