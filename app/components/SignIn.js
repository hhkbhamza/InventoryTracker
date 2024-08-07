"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import { useAuth } from '@/app/context/AuthContext';
import { TextField, Button, Box, Typography, Link } from '@mui/material';
import NextLink from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSignIn = async () => {
    console.log("Sign In button clicked");
    try {
      await signIn(email, password);
      console.log("Sign In successful");
      router.push('/'); // Redirect to home page after successful sign-in
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h4">Sign In</Typography>
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
      <Button variant="contained" onClick={handleSignIn}>
        Sign In
      </Button>
      <NextLink href="/signup" passHref>
        <Link>Don't have an account? Sign Up</Link>
      </NextLink>
    </Box>
  );
};

export default SignIn;
