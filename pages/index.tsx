import { useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import { UiContext } from "../src/context/UIContextBase";
import { EntryList } from "../src/components";
import { LayoutMain } from "../src/layout";
import { AddEntry } from "../src/components/AddEntry";

const Home: NextPage = () => {
  const { showMessages, setShowMessages } = useContext(UiContext);

  return (
    <LayoutMain title="OpenJira - Home">
      <Typography
        align="center"
        sx={{ color: "#4f46e5", fontWeight: "bold", marginBottom: 1 }}
        variant="h3"
      >
        OpenJira
      </Typography>

      <Grid sx={{ pb: 2, mt: 0 }} container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "10px",
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="Pendientes" />
            <Box sx={{ px: 2 }}>
              <AddEntry />
            </Box>
            <CardContent>
              <EntryList status="Pendiente" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "10px",
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="En Progreso" />

            <CardContent>
              <EntryList status="En Progreso" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              borderRadius: "10px",
              height: "calc(100vh - 100px)",
            }}
          >
            <CardHeader title="Completadas" />

            <CardContent>
              <EntryList status="Completado" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={showMessages.show}
        autoHideDuration={1200}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setShowMessages(false, "", "success")}
      >
        <Alert
          onClose={() => setShowMessages(false, "", "success")}
          severity={showMessages.status}
          sx={{ width: "100%" }}
        >
          {showMessages.message ?? "Mensaje"}
        </Alert>
      </Snackbar>
    </LayoutMain>
  );
};

export default Home;
