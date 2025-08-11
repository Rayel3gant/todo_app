import { useQuery } from "@tanstack/react-query";
const GIHUB_REPO_URL =
  "https://api.github.com/repos/Rayel3gant/interview-for-aakash-singh";

const fetchGithubRepoData = async () => {
  try {
    const response = await fetch(GIHUB_REPO_URL);
    if (!response.ok) {
      throw new Error("Error in fetching github repo data");
    }
    const data=await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export function useGhRepoData() {
  return useQuery({
    queryKey: ["repoData"],
    queryFn: fetchGithubRepoData,
    staleTime: 2000,
  });
}
