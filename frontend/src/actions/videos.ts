"use server";

import supabase from '@/config/supabaseClient'

export const fetchVideos = async () => {
  const { data, error } = await supabase
    .from('Videos')
    .select('*')
  if (error) {
    console.error(error)
    return []
  }
  return data;
}