"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { LangTabs } from "@/components/lang-tabs";
import { Backup } from "./backup";
import { TranslationForm } from "./form";

export function TranslationsEditor() {
  const [currentLanguage, setCurrentLanguage] = useState<"tab-en" | "tab-ar">(
    "tab-en"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Translations</CardTitle>
          <CardDescription>
            Manage translations for your application. Only editing is allowed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex items-center w-full max-w-sm">
              <Search className="absolute left-2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search translations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Backup currentLanguage={currentLanguage} />
              <Button
                type="button"
                onClick={async () => await queryClient.invalidateQueries()}
              >
                Refresh
              </Button>
            </div>
          </div>

          <LangTabs
            value={currentLanguage}
            onValueChange={(e) => setCurrentLanguage(e as "tab-en" | "tab-ar")}
            showSave={false}
          >
            <TranslationForm
              lang="en_"
              currentLanguage="tab-en"
              searchTerm={searchTerm}
            />
            <TranslationForm
              lang="ar_"
              currentLanguage="tab-ar"
              searchTerm={searchTerm}
            />
          </LangTabs>
        </CardContent>
      </Card>
    </div>
  );
}
