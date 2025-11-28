"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import React, { useContext, useEffect, useState } from 'react';

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initializeUser = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error("Session error:", sessionError);
          return;
        }
        if (!session) {
          console.log("No active session. User not logged in yet.");
          return;
        }

        const currentUser = session.user;

        // Check if user already exists in "Users" table
        const { data: existingUsers, error: selectError } = await supabase
          .from("Users")
          .select("*")
          .eq("id", currentUser.id); // ✅ check by id, not just email

        if (selectError) {
          console.error("Select error:", selectError);
          return;
        }

        if (!existingUsers || existingUsers.length === 0) {
          // Insert new user if not exists
          const { data: insertedUser, error: insertError } = await supabase
            .from("Users")
            .insert([{
              id: currentUser.id, // ✅ use auth.users.id as PK
              name: currentUser.user_metadata?.name || "",
              email: currentUser.email,
              picture: currentUser.user_metadata?.picture || ""
            }])
            .select()
            .single();

          if (insertError) {
            console.error("Insert error:", insertError);
            return;
          }

          console.log("Inserted user:", insertedUser);
          setUser(insertedUser);
        } else {
          console.log("Existing user found:", existingUsers[0]);
          setUser(existingUsers[0]);
        }

      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    initializeUser();
  }, []);

  return (
    <UserDetailContext.Provider value={{ user, setUser }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;

// Custom hook
export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
