import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'shared/contexts/AuthContext.jsx'; // Updated path
import { useCart } from 'shared/contexts/CartContext.jsx'; // Updated path
import { Button } from 'shared/ui/button.jsx'; // Updated path
import { ShoppingCart, UserCircle } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { totalItems } = useCart();

  const handleSignOut = async () => {
    await signOut();
    // Redirect to auth page or home
  };

  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Kenya Market Hub
        </Link>
        <nav className="space-x-4">
          <Link to="/shop" className="hover:underline">Shop</Link>
          <Link to="/rides" className="hover:underline">Rides</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          {/* Add more top-level links */}
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="flex items-center space-x-1 hover:underline">
                <UserCircle className="h-6 w-6" />
                <span>{user.email}</span>
              </Link>
              {user.user_metadata?.role === 'vendor' && (
                <Link to="/vendor" className="hover:underline">Vendor Dashboard</Link>
              )}
              {user.user_metadata?.role === 'admin' && (
                <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
              )}
              <Button onClick={handleSignOut} variant="outline" className="text-primary hover:bg-primary/90">Sign Out</Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;