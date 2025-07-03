import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';
import { supabase } from 'shared/api/supabaseClient.js'; // Updated path
// import { Product } from 'features/ecommerce/types/product.js'; // This line might not be needed if not strictly typed
import { toast } from 'sonner';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCart(user.id);
    } else {
      setCart([]);
      setIsLoading(false);
    }
  }, [user]);

  const fetchCart = async (userId) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        quantity,
        products (
          id,
          name,
          price,
          image_url
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to load cart.');
      setCart([]);
    } else {
      const fetchedCartItems = data.map((item) => ({
        product_id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantity,
        image_url: item.products.image_url,
      }));
      setCart(fetchedCartItems);
    }
    setIsLoading(false);
  };

  const addToCart = async (product, quantity) => {
    if (!user) {
      toast.error('Please log in to add items to your cart.');
      return;
    }
    setIsLoading(true);
    const existingItem = cart.find(item => item.product_id === product.id);

    if (existingItem) {
      await updateCartItemQuantity(product.id, existingItem.quantity + quantity);
    } else {
      const { error } = await supabase
        .from('cart_items')
        .insert({ user_id: user.id, product_id: product.id, quantity });
      if (error) {
        console.error('Error adding to cart:', error);
        toast.error('Failed to add item to cart.');
      } else {
        await fetchCart(user.id);
        toast.success(`${product.name} added to cart.`);
      }
    }
    setIsLoading(false);
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    if (!user) return;
    setIsLoading(true);
    if (quantity <= 0) {
      await removeFromCart(productId);
    } else {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', productId);
      if (error) {
        console.error('Error updating cart item quantity:', error);
        toast.error('Failed to update cart item quantity.');
      } else {
        await fetchCart(user.id);
      }
    }
    setIsLoading(false);
  };

  const removeFromCart = async (productId) => {
    if (!user) return;
    setIsLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('product_id', productId);
    if (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove item from cart.');
    } else {
      await fetchCart(user.id);
      toast.success('Item removed from cart.');
    }
    setIsLoading(false);
  };

  const clearCart = async () => {
    if (!user) return;
    setIsLoading(true);
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);
    if (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart.');
    } else {
      setCart([]);
      toast.success('Cart cleared.');
    }
    setIsLoading(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = { cart, addToCart, updateCartItemQuantity, removeFromCart, clearCart, totalItems, totalPrice, isLoading };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};