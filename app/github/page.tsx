"use client";
import { useGhRepoData } from "@/hooks/useGhRepoData";
import React from "react";

const Page = () => {
  const { data: repoData, isError, isLoading, error } = useGhRepoData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : {error.message}</div>;
  }

  return <div>
    {
        JSON.stringify(repoData)
    }
  </div>;
};

export default Page;
