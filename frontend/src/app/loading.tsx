"use client"

import { ClipLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center">
        <ClipLoader size={60} color="white" />
        <span className="mt-4 text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
};