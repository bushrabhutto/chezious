"use client";

import { useCart } from "@/context/CartContext";

const CartPage = () => {
  const { state, dispatch } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>

      {state.cart.length === 0 ? (
        <p>Your cart is empty. Start adding items!</p>
      ) : (
        <div>
          {state.cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b p-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
              <h3 className="font-bold">{item.name}</h3>
              <p>Rs. {item.price}</p>

              <div className="flex items-center">
                <button
                  className="px-2 py-1 bg-gray-200"
                  onClick={() =>
                    dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity - 1 } })
                  }
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="px-4">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200"
                  onClick={() =>
                    dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: item.quantity + 1 } })
                  }
                >
                  +
                </button>
              </div>

              <button
                className="text-red-500"
                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item })}
              >
                ❌
              </button>
            </div>
          ))}

          <div className="mt-4 font-bold text-xl">
            Total: Rs. {state.totalPrice}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
