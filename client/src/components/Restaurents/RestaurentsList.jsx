import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams } from "react-router-dom";
import { useRestaurantsByCategory } from "../../hooks/useRestaurants";

const RestaurentsList = () => {
  const { categoryId } = useParams();
  const { data } = useRestaurantsByCategory(categoryId);
// console.log(data?.data?.data)
  const restaurants = data?.data?.data || [];
  const category = data?.data?.category;

  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Dynamic filter collections
  const allTags = [...new Set(restaurants.flatMap((r) => r.tags || []))];
  const allCities = [...new Set(restaurants.map((r) => r.address.city))];
  const allCuisines = [
    ...new Set(restaurants.flatMap((r) => r.cuisineNames || [])),
  ];

  const handleTagFilter = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag));
  };

  const handleCityFilter = (city) => {
    setSelectedCity((prev) => (prev === city ? null : city));
  };

  const filtered = useMemo(() => {
    let result = restaurants;
    if (selectedTag)
      result = result.filter((r) => r.tags?.includes(selectedTag));
    if (selectedCity)
      result = result.filter((r) => r.address.city === selectedCity);
    if (selectedCuisine)
      result = result.filter((r) => r.cuisineNames?.includes(selectedCuisine));
    return result;
  }, [selectedTag, selectedCity, selectedCuisine, restaurants]);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ fontSize: "12px", color: "grey", mb: 2 }}>
        <Link to="/">Home /</Link>{" "}
        <span style={{ color: "black", fontWeight: 500 }}>
          {category?.name}
        </span>
      </Box>

      <Typography variant="h3" fontWeight="bold" mb={1}>
        {category?.name}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        {category?.description}
      </Typography>
      <Divider sx={{ my: 3 }} />

      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          whiteSpace: "nowrap",
          gap: 1,
          mb: 3,
          pb: 1,
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
            sx={{
              borderRadius: "16px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          />
        ))}

        {allCities.map((city, i) => (
          <Chip
            key={`city-${i}`}
            label={city}
            variant={selectedCity === city ? "filled" : "outlined"}
            onClick={() => handleCityFilter(city)}
            clickable
            sx={{
              borderRadius: "16px",
              flexShrink: 0,
              whiteSpace: "nowrap",
            }}
          />
        ))}

        <FormControl
          size="small"
          sx={{
            minWidth: 150,
            flexShrink: 0,
          }}
        >
          <InputLabel>Cuisine</InputLabel>
          <Select
            value={selectedCuisine}
            label="Cuisine"
            onChange={(e) => setSelectedCuisine(e.target.value)}
            sx={{
              borderRadius: 6,
              height: 30,
            }}
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

      {/* <Divider sx={{ my: 3 }} /> */}

      <Typography variant="h4" fontWeight={600} mb={3}>
  Restaurants to explore 
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{ justifyContent: { xs: "center", md: "start" } }}
      >
        {filtered.length <=0? (
          <Box 
  sx={{ 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
     p: 4,
    maxWidth: 600,
    mx: 'auto'
  }}
>
  <CardMedia
    component="img"
    image="/no_restaurnt_add.png"  
    alt="No restaurants illustration"
    sx={{
      height: 240,
      width: 240,
      objectFit: 'contain',
      mb: 1,
      opacity: 0.8
    }}
  />
  
  <Typography
              variant="h4"
              color="text.secondary"
              fontWeight={700}
              gutterBottom
            >
              Oops..! No restaurants found
            </Typography>
  
  <Typography variant="body1" color="text.secondary">
              No restaurants have been added for this category yet.
            </Typography>
  
 
</Box>
        ) : (
          <Grid
            container
            spacing={3}
            sx={{ justifyContent: { xs: "center", md: "start" } }}
          >
            {filtered.map((res) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={res._id}>
                <Link to={`restaurent-wise-menus/${res._id}`}>
                  <Card
                    sx={{
                      width: 270,
                      height: 300,
                      borderRadius: 4,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      transition: "0.3s",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                      },
                    }}
                  >
                    <Box
                      sx={{ width: "100%", height: 160, overflow: "hidden" }}
                    >
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
                    <CardContent
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                      }}
                    >
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
 
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 0.5,
                        }}
                      >
                        <Chip
                          icon={
                            <StarIcon sx={{ color: "#fff", fontSize: 16 }} />
                          }
                          label={
                            res.rating > 0 ? res.rating.toFixed(1) : "No rating"
                          }
                          size="small"
                          sx={{
                            backgroundColor: "#48bb78",
                            color: "#fff",
                            fontWeight: 500,
                            borderRadius: "6px",
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", fontWeight: 500 }}
                        >
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
                      <Typography
                        variant="body2"
                        sx={{ color: "#999", fontSize: "0.8rem", mt: "auto" }}
                      >
                        {res.address.city}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default RestaurentsList;
