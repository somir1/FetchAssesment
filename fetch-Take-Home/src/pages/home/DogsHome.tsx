import { useState } from "react";
import { TabsContainer } from "../../components/ui/TabsContainer";
import { SearchDogs } from "../search/SearchDogs";
import { MatchedDogs } from "../matches/MatchedDogs";

export const DogsHomePage = () => {
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavoriteDogs((prev) => {
      if (prev.includes(id)) {
        return prev.filter((dogId) => dogId !== id);
      }
      return [...new Set([...prev, id])];
    });
  };

  return (
    <TabsContainer
      tabs={[
        {
          label: "Search Dogs",
          content: (
            <SearchDogs
              toggleFavorite={toggleFavorite}
              favoriteDogs={favoriteDogs}
            />
          ),
        },
        {
          label: "Matches",
          content: (
            <MatchedDogs
              favoriteDogs={favoriteDogs}
              toggleFavorite={toggleFavorite}
            />
          ),
        },
      ]}
    />
  );
};
