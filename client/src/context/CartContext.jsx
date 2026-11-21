import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('scentory_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('scentory_cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (product, selectedVariant, quantity = 1) => {
    if (!product || !selectedVariant) return;

    const unitPrice = selectedVariant.discountPrice || selectedVariant.price;

    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.productId === product.id && item.variantId === selectedVariant.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            productName: product.name,
            image: product.images?.[0] || '',
            variantId: selectedVariant.id,
            variantSize: selectedVariant.size,
            originalPrice: selectedVariant.price,
            price: unitPrice,
            quantity: quantity,
            maxStock: selectedVariant.stock
          }
        ];
      }
    });

    showToast(`Added ${quantity}x ${product.name} (${selectedVariant.size}) to cart`);
  };

  const updateQuantity = (productId, variantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.productId === productId && item.variantId === variantId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, variantId) => {
    setCart(prev =>
      prev.filter(item => !(item.productId === productId && item.variantId === variantId))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = cart.length === 0 ? 0 : 500;
  const finalTotal = subtotal + deliveryFee;
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      subtotal,
      deliveryFee,
      finalTotal,
      totalItemCount,
      toastMessage
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
