"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    console.log("Sign Up button clicked");
    try {
      await signUp(email, password);
      console.log("Sign Up successful");
      router.push('/');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h4">Sign Up</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSignUp}>
        Sign Up
      </Button>
      <NextLink href="/signin" passHref>
        <Link>Already have an account? Sign In</Link>
      </NextLink>
    </Box>
  );
};

export default SignUp;
