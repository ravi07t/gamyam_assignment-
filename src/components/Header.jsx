import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import gamyamLogo from "../assets/gamyam_logo.png";

const Header = () => {
  return (
    <Container className="headerStyle">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "10px",
        }}
      >
        <Grid>
          <img src={gamyamLogo} alt="logo" width={100} />
        </Grid>
        <Grid>
          <Button
            variant="outlined"
            style={{ border: "1px solid orange", backgroundColor: "#ff7c26" }}
          >
            <a
              href="https://www.gamyam.com/"
              style={{ textDecoration: "none", color: "#ffffff" }}
            >
              Contact Us
            </a>
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Header;
