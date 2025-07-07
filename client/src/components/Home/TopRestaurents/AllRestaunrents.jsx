import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Container,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Divider,
} from "@mui/material";
import "@fontsource/poppins";
import StarIcon from "@mui/icons-material/Star";
import { useAllRestaurants } from "../../../hooks/useRestaurants";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AllRestaunrents = () => {
  const { data } = useAllRestaurants();
  const restaurants = data?.data?.data || [];

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const withMockPrice = restaurants.map((res) => ({
    ...res,
    avgPrice: Math.floor(Math.random() * 500) + 100,
  }));

  const allTags = [...new Set(restaurants.flatMap((r) => r.tags || []))];
  const allCities = [...new Set(restaurants.map((r) => r.address.city))];
  const allCuisines = [...new Set(restaurants.flatMap((r) => r.cuisineNames || []))];

  const handleTagFilter = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  const handleCityFilter = (city) => {
    setSelectedCity((prev) => (prev === city ? null : city));
  };

  const filtered = useMemo(() => {
    let result = withMockPrice;
    if (selectedTag) {
      result = result.filter((r) => r.tags?.includes(selectedTag));
    }
    if (selectedCity) {
      result = result.filter((r) => r.address.city === selectedCity);
    }
    if (selectedCuisine) {
      result = result.filter((r) => r.cuisineNames?.includes(selectedCuisine));
    }
    return result;
  }, [selectedTag, selectedCity, selectedCuisine, withMockPrice]);

  return (
    <>
      <Divider sx={{ my: 2, mx: 3 }} />
      <Container sx={{ py: 2 }}>
        <Typography
          fontWeight="bold"
          mb={2}
          sx={{
            fontSize: "26px",
            fontFamily: '"Poppins", sans-serif',
            background: "linear-gradient(to right, black, chocolate)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            display: "inline-block",
          }}
        >
          Restaurants with online food delivery in Kolkata
        </Typography>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              pt: 1,
              flexWrap: "nowrap",
              overflowX: "auto",
              width: "100%",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {allTags.map((tag, i) => (
              <Chip
                key={i}
                label={tag}
                variant={selectedTag === tag ? "filled" : "outlined"}
                onClick={() => handleTagFilter(tag)}
                clickable
                sx={{ borderRadius: "16px", whiteSpace: "nowrap" }}
              />
            ))}

            {allCities.map((city, i) => (
              <Chip
                key={`city-${i}`}
                label={city}
                variant={selectedCity === city ? "filled" : "outlined"}
                onClick={() => handleCityFilter(city)}
                clickable
                sx={{ borderRadius: "16px", whiteSpace: "nowrap" }}
              />
            ))}

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Cuisine</InputLabel>
              <Select
                value={selectedCuisine}
                label="Cuisine"
                sx={{ borderRadius: 6, height: "30px" }}
                onChange={(e) => setSelectedCuisine(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {allCuisines.map((cuisine, i) => (
                  <MenuItem key={i} value={cuisine}>
                    {cuisine}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Grid Cards with animation */}
        <Grid container spacing={3} sx={{ justifyContent: { xs: "center", md: "start", lg: "start" } }}>
          {filtered.map((res, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={res._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Link to={`restaurents/${res._id}/restaurent-wise-menus/${res._id}`} style={{ textDecoration: "none" }}>
                  <Card
                    sx={{
                      width: "270px",
                      height: 300,
                      borderRadius: 4,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "0.3s",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Box sx={{ width: "100%", height: 160, overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        image={`http://localhost:3001/${res.image}`}
                        alt={res.name}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 2, display: "flex", flexDirection: "column", flexGrow: 1 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          fontSize: "1rem",
                          mb: 0.5,
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {res.name}
                      </Typography>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Chip
                          icon={<StarIcon sx={{ color: "#fff", fontSize: 16 }} />}
                          label={res.rating > 0 ? res.rating.toFixed(1) : "No rating"}
                          size="small"
                          sx={{
                            backgroundColor: "#48bb78",
                            color: "#fff",
                            fontWeight: 500,
                            borderRadius: "6px",
                          }}
                        />
                        <Typography variant="body2" sx={{ color: "#666", fontWeight: 500 }}>
                          {res.deliveryTime} mins
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#888",
                          fontSize: "0.85rem",
                          mb: 0.5,
                          display: "-webkit-box",
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {res.cuisineNames.join(", ")}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#999", fontSize: "0.8rem", mt: "auto" }}>
                        {res.address.city}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AllRestaunrents;
