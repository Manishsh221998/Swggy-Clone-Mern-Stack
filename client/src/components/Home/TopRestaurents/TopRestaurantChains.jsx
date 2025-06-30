import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Chip,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import EastIcon from "@mui/icons-material/East";
import StarIcon from "@mui/icons-material/Star";
import { useAllRestaurants } from "../../../hooks/useRestaurants";
import { Link } from "react-router-dom";
  
const TopRestaurantChains = () => {
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data } = useAllRestaurants();
  const restaurants = data?.data?.data || [];
// console.log(restaurants)
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 350;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
        <Divider sx={{ my: 2, mx: 3 }} />
      <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 4 }, backgroundColor: "#fff" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb:2 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "1.7rem" },
              color: "#333",
            }}
          >
            Top restaurant chains in Kolkata
          </Typography>
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 1 }}>
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
          )}
        </Box>

        {/* Card Scroll Container */}
        <Box
          ref={scrollRef}
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
          {restaurants.slice(0, 8).map((restaurant, index) => (
             <Link to={`restaurents/${restaurant._id}/restaurent-wise-menus/${restaurant._id}`}>
              <Card
              key={index}
              sx={{
                width: "clamp(240px, 85vw, 280px)",
                flexShrink: 0,
                borderRadius: 4,
                my:0.5,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 160,
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={`http://localhost:3001/${restaurant.image}`}
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

                <Typography
                  variant="body2"
                  sx={{
                    color: "#999",
                    fontSize: "0.8rem",
                  }}
                >
                  {restaurant.address?.city}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default TopRestaurantChains;
