import { useQuery } from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface WordResponse {
  word: string;
  puzzleNumber: number;
}

export const useGetWord = () => {
  return useQuery<WordResponse>({
    queryKey: ["word-of-the-day"],
    queryFn: async () => {
      const response = await fetch(BASE_URL as string);
      return response.json();
    },
  });
};
