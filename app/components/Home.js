"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  Modal,
  TextField,
  Link,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import SignOutButton from "./SignOutButton";
import { useAuth } from "@/app/context/AuthContext";
import NextLink from "next/link";

const Home = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const { user } = useAuth();

  const updateInventory = useCallback(async () => {
    if (!user) return;
    const userRef = collection(firestore, "users", user.uid, "inventory");
    const snapshot = query(userRef);
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  }, [user]);

  useEffect(() => {
    if (user) {
      updateInventory();
    }
  }, [user, updateInventory]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addItem = async (item, quantity) => {
    if (!user) return;
    const userRef = doc(firestore, "users", user.uid, "inventory", item);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const existingQuantity = docSnap.data().quantity;
      console.log(`Existing quantity for ${item}:`, existingQuantity); // Debug log
      const updatedQuantity =
        parseInt(existingQuantity, 10) + parseInt(quantity, 10);
      console.log(`Updated quantity for ${item}:`, updatedQuantity); // Debug log
      await setDoc(userRef, { quantity: updatedQuantity }, { merge: true });
    } else {
      await setDoc(userRef, { quantity: parseInt(quantity, 10) });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    if (!user) return;
    const userRef = doc(firestore, "users", user.uid, "inventory", item);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const existingQuantity = docSnap.data().quantity;
      console.log(`Existing quantity for ${item}:`, existingQuantity); // Debug log
      const updatedQuantity = parseInt(existingQuantity, 10) - 1;
      if (updatedQuantity <= 0) {
        await deleteDoc(userRef);
      } else {
        console.log(`Updated quantity for ${item}:`, updatedQuantity); // Debug log
        await setDoc(userRef, { quantity: updatedQuantity }, { merge: true });
      }
    }

    await updateInventory();
  };

  const deleteItem = async (item) => {
    if (!user) return;
    const userRef = doc(firestore, "users", user.uid, "inventory", item);
    await deleteDoc(userRef);
    await updateInventory();
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      {user ? (
        <>
          <SignOutButton />
          <Modal open={open} onClose={handleClose}>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              width={400}
              bgcolor="white"
              border="2px solid black"
              boxShadow={24}
              p={4}
              display="flex"
              flexDirection="column"
              gap={3}
              sx={{
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography variant="h6">Add Item</Typography>
              <Stack width="100%" direction="column" spacing={2}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Item Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button
                  variant="outlined"
                  onClick={() => {
                    const normalizedItemName = itemName.trim().toLowerCase();
                    const parsedQuantity = parseInt(quantity, 10);
                    const finalQuantity =
                      isNaN(parsedQuantity) || parsedQuantity <= 0
                        ? 1
                        : parsedQuantity;
                    if (normalizedItemName !== "") {
                      addItem(normalizedItemName, finalQuantity);
                      setItemName("");
                      setQuantity("");
                      handleClose();
                    }
                  }}
                >
                  Add
                </Button>
              </Stack>
            </Box>
          </Modal>

          <Button
            variant="outlined"
            onClick={() => {
              handleOpen();
            }}
          >
            Add New Item
          </Button>
          <Box border="1px solid #333">
            <Box
              width="800px"
              height="100px"
              bgcolor="#ADD8E6"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography variant="h2" color="#333">
                Inventory Items
              </Typography>
            </Box>

            <Stack width="800px" height="300px" spacing={2} overflow="auto">
              {inventory.map(({ name, quantity }) => (
                <Box
                  key={name}
                  width="100%"
                  minHeight="150px"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  bgcolor="#FFFFFF"
                  padding={5}
                >
                  <Typography variant="h3" color="#333" textAlign="center">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </Typography>
                  <Typography variant="h3" color="#333" textAlign="center">
                    {quantity}
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        addItem(name, 1);
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        removeItem(name);
                      }}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => {
                        deleteItem(name);
                      }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </>
      ) : (
        <>
          <NextLink href="/signin" passHref>
            <Link>
              <Button variant="outlined">Sign In</Button>
            </Link>
          </NextLink>
          <NextLink href="/signup" passHref>
            <Link>
              <Button variant="outlined">Sign Up</Button>
            </Link>
          </NextLink>
        </>
      )}
    </Box>
  );
};

export default Home;
