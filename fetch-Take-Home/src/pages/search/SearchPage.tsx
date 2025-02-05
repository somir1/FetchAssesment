import { useState, useEffect } from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
import {
  fetchDogBreeds,
  fetchDogDetails,
  searchDogs,
  matchFavoriteDog,
} from "../../apis";
import { Dog, SortOrder } from "../../types";
import { DogCard } from "../../components/dogs/DogCard";
import { Button } from "../../components/ui/Button";
import { SelectDropdown } from "../../components/ui/SelectDropdown";

export const SearchPage = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  useEffect(() => {
    fetchDogBreeds().then(setBreeds).catch(console.error);
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const resultIds = await searchDogs({
          breeds: selectedBreed ? [selectedBreed] : undefined,
          size: 10,
          from: (page - 1) * 10,
          sort: `breed:${sortOrder}`,
        });

        setTotalResults(resultIds.total);
        setDogs(await fetchDogDetails(resultIds.resultIds));
      } catch (error) {
        console.error(error);
      }
    };

    fetchDogs();
  }, [selectedBreed, page, sortOrder]);

  const toggleFavorite = (id: string) => {
    setFavoriteDogs((prev) =>
      prev.includes(id) ? prev.filter((dogId) => dogId !== id) : [...prev, id]
    );
  };

  const handleMatch = async () => {
    if (!favoriteDogs.length) return;

    try {
      const match = await matchFavoriteDog(favoriteDogs);
      setMatchedDog((await fetchDogDetails([match.match]))[0]);
    } catch (error) {
      console.error("Matching failed", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" mb={2}>
        Browse Available Dogs
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        gap={2}
        alignItems="center"
        mb={3}
      >
        <SelectDropdown
          label="Breed"
          value={selectedBreed}
          options={breeds}
          onChange={setSelectedBreed}
        />
        <SelectDropdown<SortOrder>
          label="Sort By"
          value={sortOrder}
          options={["asc", "desc"]}
          onChange={setSortOrder}
        />
        <Button
          label="Reset"
          onClick={() => {
            setSelectedBreed("");
            setSortOrder("asc");
            setPage(1);
          }}
          variant="contained"
        />
      </Box>

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

      {totalResults > 0 && (
        <Typography variant="h6" mb={2}>
          Total: {totalResults}
        </Typography>
      )}

      <Grid container spacing={2}>
        {dogs.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <DogCard
              dog={dog}
              isFavorited={favoriteDogs.includes(dog.id)}
              onToggleFavorite={() => toggleFavorite(dog.id)}
            />
          </Grid>
        ))}
      </Grid>

      {totalResults > 0 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(totalResults / 10)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      )}

      {favoriteDogs.length > 0 && (
        <Box mt={3} display="flex" justifyContent="center">
          <Button
            label="Find Your Match"
            onClick={handleMatch}
            variant="contained"
          />
        </Box>
      )}
    </Box>
  );
};
