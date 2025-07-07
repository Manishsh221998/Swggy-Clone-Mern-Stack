import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  Skeleton,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import StarIcon from "@mui/icons-material/Star";
import "@fontsource/poppins";
import { useAllRestaurants } from "../../../hooks/useRestaurants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const TopRestaurantChains = () => {
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data, isLoading } = useAllRestaurants(); // Use isLoading

  const restaurants = data?.data?.data || [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <>
      <Divider sx={{ my: 1.5, mx: 3 }} />
      <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 4 }, backgroundColor: "#fff" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.3 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "1.7rem", lg: "26px" },
              fontFamily: '"Poppins", sans-serif',
              background: "linear-gradient(to right, black, chocolate)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            Top restaurant chains in Kolkata
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                onClick={() => scroll("left")}
                sx={{ backgroundColor: "#f2f2f2", "&:hover": { backgroundColor: "#ddd" } }}
              >
                <KeyboardBackspaceIcon />
              </IconButton>
              <IconButton
                onClick={() => scroll("right")}
                sx={{ backgroundColor: "#f2f2f2", "&:hover": { backgroundColor: "#ddd" } }}
              >
                <EastIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Scroll Container */}
        <MotionBox
          ref={scrollRef}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          sx={{
            display: "flex",
            gap: 2.8,
            flexWrap: "nowrap",
            overflowX: "auto",
            scrollBehavior: "smooth",
            "&::-webkit-scrollbar": { display: "none" },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Box
                  key={i}
                  component={motion.div}
                  variants={fadeIn}
                  custom={i}
                  sx={{
                    width: "clamp(240px, 85vw, 280px)",
                    flexShrink: 0,
                    borderRadius: 4,
                  }}
                >
                  <Skeleton variant="rounded" height={160} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="90%" />
                </Box>
              ))
            : restaurants.slice(0, 8).map((restaurant, index) => (
                <Link
                  key={restaurant._id}
                  to={`restaurents/${restaurant._id}/restaurent-wise-menus/${restaurant._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <MotionCard
                    // whileHover={{ scale: 1.03 }}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    variants={fadeIn}
                    sx={{
                      width: "clamp(240px, 85vw, 280px)",
                      flexShrink: 0,
                      borderRadius: 4,
                      my: 0.5,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Image */}
                    <Box sx={{ width: "100%", height: 160, borderRadius: 1, overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        image={`https://swggy-clone-mern-stack.onrender.com/${restaurant.image}`}
                        alt={restaurant.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    </Box>

                    {/* Content */}
                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          mb: 0.5,
                        }}
                      >
                        {restaurant.name}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Chip
                          icon={<StarIcon sx={{ color: "#fff", fontSize: 16 }} />}
                          label={restaurant.rating.toFixed(1)}
                          size="small"
                          sx={{
                            backgroundColor: "#48bb78",
                            color: "#fff",
                            fontWeight: 500,
                            borderRadius: "6px",
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                          {restaurant.deliveryTime} mins
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#888",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "0.85rem",
                          mb: 0.5,
                        }}
                      >
                        {restaurant.cuisineNames?.join(", ")}
                      </Typography>

                      <Typography variant="body2" sx={{ color: "#999", fontSize: "0.8rem" }}>
                        {restaurant.address?.city}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Link>
              ))}
        </MotionBox>
      </Box>
    </>
  );
};

export default TopRestaurantChains;
