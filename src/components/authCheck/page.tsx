"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "../../../supabase";

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/login");
      } else {
        setSession(true);
      }
      setLoading(false);
    };

    checkUserSession();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return session ? <>{children}</> : null;
};

export default AuthCheck;
