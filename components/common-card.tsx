import Image from "next/image";
import Link from "next/link";
import React from "react";

export function CommonCard({
  imageUrl,
  name,
  slug,
}: {
  slug: string;
  name: string;
  imageUrl: string;
}) {
  return (
    <Link
      href={slug}
      className="flex-col group  cursor-pointer  shadow-sm h-full flex items-center justify-center  rounded-xl"
    >
      <div className="h-[200px] w-full relative bg-white rounded-t-xl">
        <Image
          src={imageUrl}
          className="w-full object-cover rounded-xl  group-hover:scale-105 transition-all duration-300"
          quality={100}
          fill
          alt={name}
          aria-label={name}
        />
      </div>
      <div className="bg-white rounded-b-xl w-full">
        <div className="p-6 text-center">
          <h1 className="text-2xl">{name}</h1>
        </div>
      </div>
    </Link>
  );
}
