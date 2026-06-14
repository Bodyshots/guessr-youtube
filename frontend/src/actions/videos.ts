"use server";

import { env } from "@/env";

export const getVideos = async () => {
  const response = await fetch(`${env.BACKEND_URL}/videos/`);
  const responseJson = await response.json();
  if (response.ok) return responseJson.videos;
  else console.error(response);
};