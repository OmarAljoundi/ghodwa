"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { SettingSchema } from "@/schema/setting-schema";
import { useFilteredLanguageData } from "@/hooks/use-filter-lang-data";

export function WorkingHours({
  className,
  workingHours,
}: {
  className?: string;
  workingHours: SettingSchema["workingHours"];
}) {
  const { t } = useTranslation("common");

  const filtredWorkingItems = useFilteredLanguageData(workingHours.items);

  const formatTime = (hour: number, minute: number) => {
    const adjustedHour = hour % 12 || 12;
    const period = hour >= 12 ? "PM" : "AM";
    return `${adjustedHour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  const mappedWorkingHours = useMemo(() => {
    return filtredWorkingItems.map(({ day, office }) => {
      let hours: string = "";
      if (office.state === "closed") {
        hours = "Closed";
      } else {
        const fromTime = formatTime(office.from.hour, office.from.minute);
        const toTime = formatTime(office.to.hour, office.to.minute);
        hours = `${fromTime} - ${toTime}`;
      }

      return {
        day,
        hours,
        office,
      };
    });
  }, [filtredWorkingItems]);

  return (
    <div
      className={cn(
        "p-6 bg-white rounded-3xl shadow-sm relative h-fit",
        className
      )}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-normal text-gray-800 flex items-center">
          <Clock className="mr-2 rtl:ml-2" />
          {t("Working Hours")}
        </h2>
      </div>

      <ul className="space-y-2">
        {mappedWorkingHours.map((item, index) => (
          <motion.li
            key={item.day}
            className={`flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0`}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span>{item.day}</span>
            <motion.span
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
              dir="ltr"
            >
              {t(item.hours)}
            </motion.span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
