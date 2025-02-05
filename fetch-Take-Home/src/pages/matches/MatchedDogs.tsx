import { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { fetchDogDetails, matchFavoriteDog } from "../../apis";
import { Dog } from "../../types";
import { DogCard } from "../../components/dogs/DogCard";
import { Button } from "../../components/ui/Button";

interface FavoritesProps {
  favoriteDogs: string[];
  toggleFavorite: (id: string) => void;
}

export const MatchedDogs = ({
  favoriteDogs,
  toggleFavorite,
}: FavoritesProps) => {
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [favoriteDogDetails, setFavoriteDogDetails] = useState<Dog[]>([]);

  useEffect(() => {
    if (favoriteDogs.length === 0) {
      setFavoriteDogDetails([]);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const dogs = await fetchDogDetails(favoriteDogs);
        setFavoriteDogDetails(dogs);
      } catch (error) {
        console.error("Error fetching favorite dogs:", error);
      }
    };

    fetchFavorites();
  }, [favoriteDogs]);

  const handleFindMatch = async () => {
    if (favoriteDogs.length === 0) return;

    try {
      const match = await matchFavoriteDog(favoriteDogs);
      const matchedDogData = await fetchDogDetails([match.match]);
      setMatchedDog(matchedDogData[0]);
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {favoriteDogs.length > 0 && (
        <Box mt={3} mb={3} display="flex" justifyContent="center">
          <Button
            label="Find a Match"
            onClick={handleFindMatch}
            variant="contained"
          />
        </Box>
      )}
      {matchedDog && (
        <Box mb={3}>
          <Typography variant="h5" color="primary">
            Your Matched Dog:
          </Typography>
          <DogCard
            dog={matchedDog}
            isFavorited={false}
            onToggleFavorite={() => {}}
          />
        </Box>
      )}

      <Typography variant="h4" mb={2}>
        Favorite Dogs
      </Typography>

      <Grid container spacing={2}>
        {favoriteDogDetails.length > 0 ? (
          favoriteDogDetails.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <DogCard
                dog={dog}
                isFavorited={true}
                onToggleFavorite={() => toggleFavorite(dog.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" width="100%">
            No favorite dogs yet.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};
