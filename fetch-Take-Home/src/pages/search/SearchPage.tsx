import { useState, useEffect } from "react";
import { Box, Typography, Grid, Pagination } from "@mui/material";
import {
  fetchDogBreeds,
  fetchDogDetails,
  searchDogs,
  matchFavoriteDog,
} from "../../apis";
import { Dog, SortOrder, SearchParams } from "../../types";
import { DogCard } from "../../components/dogs/DogCard";
import { Button } from "../../components/ui/Button";
import { SelectDropdown } from "../../components/ui/SelectDropdown";

export const SearchPage = () => {
  const SORT_OPTIONS: {
    label: string;
    value: { field: "breed" | "name" | "age"; order: "asc" | "desc" };
  }[] = [
    { label: "Breed (A-Z)", value: { field: "breed", order: "asc" } },
    { label: "Breed (Z-A)", value: { field: "breed", order: "desc" } },
    { label: "Name (A-Z)", value: { field: "name", order: "asc" } },
    { label: "Name (Z-A)", value: { field: "name", order: "desc" } },
    { label: "Age (Young-Old)", value: { field: "age", order: "asc" } },
    { label: "Age (Old-Young)", value: { field: "age", order: "desc" } },
  ];

  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [sortField, setSortField] = useState<"breed" | "name" | "age">("breed");
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  useEffect(() => {
    fetchDogBreeds()
      .then(setBreeds)
      .catch((error) => console.error("Error fetching breeds:", error));
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const params: SearchParams = {
          breeds: selectedBreed ? [selectedBreed] : undefined,
          size: 10,
          from: (page - 1) * 10,
          sortField: sortField,
          sortOrder: sortOrder,
        };

        const resultIds = await searchDogs(params);

        setTotalResults(resultIds.total);
        if (resultIds.resultIds.length > 0) {
          setDogs(await fetchDogDetails(resultIds.resultIds));
        } else {
          setDogs([]);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };

    fetchDogs();
  }, [selectedBreed, page, sortField, sortOrder]);
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
        <SelectDropdown
          label="Sort By"
          value={selectedSort.label}
          options={SORT_OPTIONS.map((option) => option.label)}
          onChange={(label) => {
            const selectedOption = SORT_OPTIONS.find(
              (option) => option.label === label
            );
            if (selectedOption) {
              setSelectedSort(selectedOption);
              setSortField(selectedOption.value.field);
              setSortOrder(selectedOption.value.order);
            }
          }}
        />
        <Button
          label="Reset"
          onClick={() => {
            setSelectedBreed("");
            setPage(1);
            setSelectedSort(SORT_OPTIONS[0]);
            setSortField(SORT_OPTIONS[0].value.field);
            setSortOrder(SORT_OPTIONS[0].value.order);
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
        {dogs.length > 0 ? (
          dogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <DogCard
                dog={dog}
                isFavorited={favoriteDogs.includes(dog.id)}
                onToggleFavorite={() => toggleFavorite(dog.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" textAlign="center" width="100%">
            No dogs found. Try a different search.
          </Typography>
        )}
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
