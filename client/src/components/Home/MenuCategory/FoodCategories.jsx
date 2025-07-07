import React, { useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import "@fontsource/poppins";
import { motion } from "framer-motion";
import EastIcon from "@mui/icons-material/East";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useMenuCategories } from "../../../hooks/useRestaurants";
import { Link } from "react-router-dom";
import { BaseUrlImage } from "../../../api/endpoints";

const FoodCategories = () => {
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const username = localStorage.getItem("userName");
  const { data } = useMenuCategories();
  const menuCategory = data?.data?.data || [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = isMobile ? 200 : 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", md: "1.7rem", lg: "26px" },
            fontFamily: '"Poppins", sans-serif',
            background: "linear-gradient(to right, black, chocolate)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {username ? `${username}, ` : ""}What's on your mind?
        </Typography>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <IconButton
            onClick={() => scroll("left")}
            sx={{
              backgroundColor: "#f2f2f2",
              "&:hover": { backgroundColor: "#ddd" },
            }}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
          <IconButton
            onClick={() => scroll("right")}
            sx={{
              backgroundColor: "#f2f2f2",
              "&:hover": { backgroundColor: "#ddd" },
            }}
          >
            <EastIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Animated Scrollable Categories */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          display: "flex",
          gap: "22px",
          flexWrap: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
          scrollBehavior: "smooth",
          maxWidth: "100%",
          padding: "0 8px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {menuCategory.map((category, index) => (
          <Link to={`restaurents/${category._id}`} key={category._id}>
            <Box
              sx={{
                minWidth: { xs: "90px", md: "130px" },
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  width: { xs: "90px", md: "130px" },
                  height: { xs: "90px", md: "130px" },
                  mx: "auto",
                  mb: 1,
                  p: 1.1,
                }}
              >
                <img
                  src={
                    category?.image
                      ? `${BaseUrlImage}/${category?.image}`
                      : "/placeholder.svg"
                  }
                  alt={category.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color: "#333",
                  fontSize: { xs: "0.75rem", md: "0.875rem" },
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </motion.div>
    </Box>
  );
};

export default FoodCategories;
