// "use client";

// import * as React from "react";
// import { useTranslation } from "react-i18next";
// import { useQuery } from "@tanstack/react-query";
// import {
//   BookUser,
//   Brush,
//   Newspaper,
//   Search,
//   File,
//   Image,
//   Link as LinkIcon,
// } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from "@/components/ui/command";
// import { Avatar } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { useDebounce } from "@/hooks/use-debounce";
// import { Skeleton } from "@/components/ui/skeleton";
// import { SearchWebsite } from "../lib/globle-search-index";
// import { AlgoliaSearchResult } from "../lib/type";
// import { CommandLoading } from "cmdk";
// import Link from "next/link";

// export function CommandSearch({
//   children,
//   open,
//   setOpen,
// }: {
//   children: React.ReactNode;
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const { i18n, t } = useTranslation("common");
//   const [searchString, setSearchString] = React.useState("");
//   const debouncedSearchString = useDebounce(searchString, 300);

//   const searchKey =
//     i18n.language === "en" ? "globle_index_en" : "globle_index_ar";

//   React.useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setOpen((open) => !open);
//       }
//     };

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, [setOpen]);

//   const { data: searchResults, isLoading } = useQuery({
//     queryKey: [debouncedSearchString, searchKey],
//     queryFn: async () => {
//       return (await SearchWebsite(debouncedSearchString, searchKey)) as Array<
//         Omit<AlgoliaSearchResult, "_highlightResult">
//       >;
//     },
//     enabled: debouncedSearchString.length > 2,
//   });

//   const getIconForType = (type: string) => {
//     switch (type.toLowerCase()) {
//       case "page":
//         return File;
//       case "media":
//         return Image;
//       case "link":
//         return LinkIcon;
//       default:
//         return Search;
//     }
//   };

//   const SkeletonItem = () => (
//     <div className="flex w-full items-center space-x-2 p-4">
//       <Skeleton className="h-8 w-8 rounded-full" />
//       <div className="flex-1 space-y-2">
//         <Skeleton className="h-4 w-3/4" />
//         <Skeleton className="h-3 w-1/2" />
//       </div>
//       <Skeleton className="h-6 w-16" />
//     </div>
//   );

//   return (
//     <>
//       {children}

//       <CommandDialog open={open} onOpenChange={setOpen}>
//         <CommandInput
//           dir={i18n.language == "en" ? "ltr" : "rtl"}
//           placeholder={t("Type a search word...")}
//           value={searchString}
//           onValueChange={setSearchString}
//         />
//         <CommandList dir={i18n.language == "en" ? "ltr" : "rtl"}>
//           {!isLoading && <CommandEmpty>{t("No results found.")}</CommandEmpty>}
//           {isLoading && (
//             <CommandLoading>
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 >
//                   {[...Array(3)].map((_, index) => (
//                     <SkeletonItem key={`skeleton-${index}`} />
//                   ))}
//                 </motion.div>
//               </AnimatePresence>
//             </CommandLoading>
//           )}

//           <AnimatePresence mode="wait">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <CommandGroup
//                 heading={t("Quick start")}
//                 className="text-left rtl:text-right"
//               >
//                 <CommandItem>
//                   <Link
//                     href={"/media-center"}
//                     onClick={() => setOpen(false)}
//                     className="flex w-full items-center justify-between space-x-2"
//                   >
//                     <Newspaper
//                       size={16}
//                       strokeWidth={2}
//                       className="mr-2 opacity-60 rtl:ml-2"
//                       aria-hidden="true"
//                     />
//                     <span>{t("Media Center")}</span>
//                   </Link>
//                 </CommandItem>
//                 <CommandItem>
//                   <Link
//                     href={"/artwork"}
//                     onClick={() => setOpen(false)}
//                     className="flex w-full items-center justify-between space-x-2"
//                   >
//                     <Brush
//                       size={16}
//                       strokeWidth={2}
//                       className="mr-2 opacity-60 rtl:ml-2"
//                       aria-hidden="true"
//                     />
//                     <span>{t("Artworks")}</span>
//                   </Link>
//                 </CommandItem>
//                 <CommandItem>
//                   <Link
//                     href={"/contact"}
//                     onClick={() => setOpen(false)}
//                     className="flex w-full items-center justify-between space-x-2"
//                   >
//                     <BookUser
//                       size={16}
//                       strokeWidth={2}
//                       className="mr-2 opacity-60 rtl:ml-2"
//                       aria-hidden="true"
//                     />
//                     <span>{t("Contact us")}</span>
//                   </Link>
//                 </CommandItem>
//               </CommandGroup>
//               <CommandSeparator />
//             </motion.div>

//             {debouncedSearchString.length > 2 && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 <CommandGroup heading={t("Search Results")}>
//                   <AnimatePresence mode="wait">
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       exit={{ opacity: 0 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {searchResults?.map((result) => {
//                         const Icon = getIconForType(result.type);
//                         return (
//                           <CommandItem
//                             key={result.objectID}
//                             value={result.title}
//                           >
//                             <Link
//                               href={result.slug}
//                               onClick={() => setOpen(false)}
//                               className="flex w-full items-center justify-between space-x-2"
//                             >
//                               <div className="flex w-full justify-start gap-x-2">
//                                 <Avatar className="h-8 w-8">
//                                   <Icon className="h-4 w-4" />
//                                 </Avatar>
//                                 <div className="flex flex-1 flex-col overflow-hidden">
//                                   <span
//                                     className="truncate text-sm font-medium"
//                                     dangerouslySetInnerHTML={{
//                                       __html: result.title,
//                                     }}
//                                   />

//                                   <span
//                                     className="line-clamp-1 text-xs text-muted-foreground"
//                                     dangerouslySetInnerHTML={{
//                                       __html: result.description,
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <Badge
//                                 variant="outline"
//                                 className="ml-auto"
//                                 dangerouslySetInnerHTML={{
//                                   __html: result.type,
//                                 }}
//                               />
//                             </Link>
//                           </CommandItem>
//                         );
//                       })}
//                     </motion.div>
//                   </AnimatePresence>
//                 </CommandGroup>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </CommandList>
//       </CommandDialog>
//     </>
//   );
// }
