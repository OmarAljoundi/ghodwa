import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { History, RotateCcw } from "lucide-react";
import React, { useState } from "react";
import { getBackups, restoreFromBackup } from "../actions";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export function Backup({
  currentLanguage,
}: {
  currentLanguage: "tab-en" | "tab-ar";
}) {
  const queryClient = useQueryClient();

  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string>("");

  const { data: backupsList = [], isLoading: isBackupsLoading } = useQuery({
    queryKey: ["backups", currentLanguage],
    queryFn: () => getBackups(currentLanguage),
    staleTime: 1000 * 60 * 5,
  });

  const restoreBackupMutation = useMutation({
    mutationFn: ({
      lang,
      filename,
    }: {
      lang: "tab-en" | "tab-ar";
      filename: string;
    }) => restoreFromBackup(lang, filename),
    onSuccess: () => {
      toast.success("Backup restored", {
        description: `Successfully restored translations from backup`,
      });
      queryClient.invalidateQueries({
        queryKey: ["translations", currentLanguage],
      });
      queryClient.invalidateQueries({ queryKey: ["backups", currentLanguage] });
      setShowBackupDialog(false);
    },
    onError: (error) => {
      toast.error("Error restoring backup", {
        description: "Failed to restore from backup. Please try again.",
      });
      console.error(error);
    },
  });
  function handleRestoreBackup() {
    if (!selectedBackup) {
      toast.error("No backup selected", {
        description: "Please select a backup to restore",
      });
      return;
    }

    restoreBackupMutation.mutate({
      lang: currentLanguage,
      filename: selectedBackup,
    });
  }
  return (
    <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <History className="h-4 w-4" />
          Backups
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translation Backups</DialogTitle>
          <DialogDescription>
            Restore from a previous backup. A new backup of the current state
            will be created before restoring.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isBackupsLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : backupsList.length > 0 ? (
            <Select value={selectedBackup} onValueChange={setSelectedBackup}>
              <SelectTrigger>
                <SelectValue placeholder="Select a backup..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Backups</SelectLabel>
                  {backupsList.map((backup) => (
                    <SelectItem key={backup.filename} value={backup.filename}>
                      {backup.displayDate}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <div className="text-center text-muted-foreground py-2">
              No backups available for {currentLanguage} translations.
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setShowBackupDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRestoreBackup}
            disabled={
              !selectedBackup ||
              isBackupsLoading ||
              restoreBackupMutation.isPending
            }
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Restore Backup
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
