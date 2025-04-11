"use client";

import LandingPage from "@/components/LandingPage/LandingPage";
import useCheckSign from "@/hooks/useCheckSign";
import { useCollections } from "@/hooks/useCollections";
import FeedProvider from "@/providers/FeedProvider";

const HomePage = () => {
  const { data } = useCollections();
  useCheckSign();

  return (
    <FeedProvider collections={data || []}>
      <LandingPage />
    </FeedProvider>
  );
};

export default HomePage;
