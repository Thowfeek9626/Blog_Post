"use client";

import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import logo from '../../public/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { useState } from "react";

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "linear-gradient(90deg, #2196F3 0%, #E91E63 100%)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <Link href="/" passHref>
            <Box sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Image
                src={logo}
                alt="Blog Logo"
                priority
                width={50}
                height={50}
                style={{ transform: 'scale(1.5)', objectFit: 'contain' }}
              />
              <Typography
                variant="overline"
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: 1,
                  marginLeft: 1,
                  color: "#fcecd3",
                }}
              >
                Blog Dashboard
              </Typography>
            </Box>
          </Link>
        </Box>
        <IconButton
          color="inherit"
          onClick={toggleDrawer}
          sx={{
            display: { xs: "block", sm: "none" }, // Display on small screens only
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on small screens
            gap: 2,
          }}
        >
          <Button
            component={Link}
            href="/"
            sx={{
              color: "#fff",
              fontWeight: "500",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Home
          </Button>
          <Button
            component={Link}
            href="/new"
            sx={{
              color: "#fff",
              fontWeight: "500",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
            }}
          >
            Create Post
          </Button>
        </Box>
      </Toolbar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            background: "linear-gradient(90deg, #4A00E0, #8E2DE2)",
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            padding: 2,
          }}
        >
          {/* Close Drawer Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={toggleDrawer} sx={{ color: "#fff" }}>
              <HighlightOffTwoToneIcon />
            </IconButton>
          </Box>

          <List>
            <ListItem
              component={Link}
              href="/"
              onClick={toggleDrawer}
              sx={{
                marginBottom: '6px',
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                borderRadius: 1,
              }}
            >
              <ListItemText primary="Home" sx={{ color: "#fff" }} />
            </ListItem>
            <ListItem
              component={Link}
              href="/new"
              onClick={toggleDrawer}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                borderRadius: 1,
              }}
            >
              <ListItemText primary="Create Post" sx={{ color: "#fff" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
