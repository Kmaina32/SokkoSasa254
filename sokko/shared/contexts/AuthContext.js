import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from 'shared/api/supabaseClient.js'; // Updated path
import { toast } from 'sonner'; // Assuming sonner is installed and correctly configured

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserRoles(session.user.id);
      }
      setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchUserRoles(session.user.id);
        } else {
          setRoles([]);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRoles = async (userId) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user roles:', error);
      setRoles([]);
    } else {
      setRoles(data.map(r => r.role));
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setIsLoading(false);
    return { user: data.user, error };
  };

  const signUp = async (email, password, role) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role_on_signup: role }
      }
    });

    if (data.user && !error) {
      await fetchUserRoles(data.user.id);
    }
    setIsLoading(false);
    return { user: data.user, error };
  };

  const signOut = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setRoles([]);
    setIsLoading(false);
    return { error };
  };

  const hasRole = (role) => {
    return roles.includes(role);
  };

  const value = { session, user, roles, isLoading, signIn, signUp, signOut, hasRole };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};