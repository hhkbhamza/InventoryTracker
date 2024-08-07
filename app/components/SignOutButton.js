"use client";

import { Button } from '@mui/material';
import { useAuth } from '@/app/context/AuthContext';

const SignOutButton = () => {
  const { signOutUser } = useAuth();

  return (
    <Button variant="contained" onClick={signOutUser}>
      Sign Out
    </Button>
  );
};

export default SignOutButton;