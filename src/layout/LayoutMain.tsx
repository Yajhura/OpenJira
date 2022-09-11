import { Box } from "@mui/material";
import Head from "next/head";
import React from "react";
import { Navbar } from "../components";

interface LayoutProp {
  children: React.ReactNode;
  title?: string;
}

export const LayoutMain = ({ children, title = "OpenJira" }: LayoutProp) => {
  return (
    <Box
      sx={{
        flexFlow: 1,
      }}
    >
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />

      <Box
        sx={{
          padding: "10px 20px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
