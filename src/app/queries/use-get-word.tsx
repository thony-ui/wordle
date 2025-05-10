import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://words.dev-apis.com/word-of-the-day?partOfSpeech=verb";
export const useGetWord = () => {
  return useQuery({
    queryKey: ["word-of-the-day"],
    queryFn: async () => {
      const response = await fetch(BASE_URL);
      return response.json();
    },
  });
};
