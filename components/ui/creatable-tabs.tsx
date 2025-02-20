"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUpDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const MotionButton = motion(Button);
interface CreatableTabsProps<TData>
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Sortable<TData>>,
    "children"
  > {
  onAddNewTab: () => void;
  onTabRemove: (index: number) => void;
  maxNumberOfTabs?: number;
  buttonTitle: (index: number) => string;
  children: (activeTab: number) => React.ReactNode;
}

export function CreatableTabs<TData>({
  onAddNewTab,
  onTabRemove,
  buttonTitle,
  maxNumberOfTabs = Number.MAX_SAFE_INTEGER,
  ...rest
}: CreatableTabsProps<TData>) {
  const [activeTab, setActiveTab] = useState(0);
  const [, setOrderedTabs] = useState(rest?.value || []);

  const appendNewTab = useCallback(() => {
    onAddNewTab();
    setActiveTab(rest?.value.length);
  }, [onAddNewTab, rest?.value]);

  useEffect(() => {
    setOrderedTabs(rest.value || []);
  }, [rest.value]);

  return (
    <div className="mx-auto w-full">
      <div
        className={cn(
          rest.value?.length == 0
            ? "hidden"
            : "relative flex flex-wrap items-center gap-4 overflow-x-auto py-3"
        )}
      >
        <AnimatePresence mode="wait">
          <Sortable
            {...rest}
            onDragEnd={(e) => {
              const index = rest?.value?.findIndex(
                (x: any) => x.id == e.over?.id
              );
              setActiveTab(index);
            }}
          >
            {rest?.value?.map((item: any, index) => (
              <SortableItem
                key={`${item.id}-${index}`}
                value={item.id}
                asTrigger={activeTab === index}
                asChild
              >
                <Button
                  type="button"
                  variant={activeTab === index ? "default" : "outline"}
                  className="relative h-9 cursor-pointer transition-all duration-300 hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => setActiveTab(index)}
                >
                  {buttonTitle(index)}
                  <MotionButton
                    asChild
                    type="button"
                    className="z-50 px-0 size-5 rounded-full bg-destructive justify-center items-center text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabRemove(index);
                      if (activeTab === index)
                        setActiveTab(Math.max(0, index - 1));
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span>
                      <X
                        className=" opacity-60 size-3"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </MotionButton>
                </Button>
              </SortableItem>
            ))}
          </Sortable>
        </AnimatePresence>
        {rest?.value?.length > 0 && (
          <Button
            type="button"
            variant="outline"
            onClick={appendNewTab}
            disabled={rest.value?.length == maxNumberOfTabs}
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      {rest?.value?.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="mt-4 space-y-4"
          >
            {rest.children(activeTab)}
          </motion.div>
        </AnimatePresence>
      ) : (
        <EmptyBlock onAdd={appendNewTab} />
      )}
    </div>
  );
}

function EmptyBlock({ onAdd }: { onAdd: () => void }) {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const iconVariants = {
    hidden: { rotate: -90, opacity: 0 },
    visible: {
      rotate: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: { yoyo: Infinity, duration: 0.3 },
    },
  };

  return (
    <div className="flex min-h-[400px] items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
      <motion.div
        className="space-y-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <motion.div
            className="inline-block text-primary"
            variants={iconVariants}
            whileHover="hover"
          >
            <TrendingUpDown size={64} />
          </motion.div>
        </motion.div>
        <motion.h2
          className="text-3xl font-bold text-primary"
          variants={childVariants}
        >
          No items are found
        </motion.h2>
        <motion.p
          className="mx-auto max-w-md text-muted-foreground"
          variants={childVariants}
        >
          It looks like you haven&apos;t created any items yet. Why not start by
          creating your first one?
        </motion.p>
        <motion.div variants={childVariants}>
          <Button size="lg" className="group" type="button" onClick={onAdd}>
            <Plus className="size-4" />
            Create New
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
