import DeleteAlert from "@/components/delete-alert";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteOne } from "@/lib/generic.server";
import { PrismaModels } from "@/lib/types";
import { Edit, Trash2 } from "lucide-react";
import React, { ReactNode } from "react";

type ToolbarActionProps<T extends { id: number }> = {
  showEdit?: boolean;
  showDelete?: boolean;
  showUpdateStatus?: boolean;
  showSave?: boolean;
  isLoading?: boolean;
  onEditRedirectTo?: (id: number) => void;
  data?: T;
  tableName: PrismaModels;
  withText?: boolean;
  children?: ReactNode;
};

export default function ToolbarAction<T extends { id: number }>({
  data,
  showDelete = true,
  showEdit = true,
  onEditRedirectTo,
  showSave = false,
  withText = false,
  isLoading = false,
  tableName,
  children,
}: ToolbarActionProps<T>) {
  const [openAlert, setOpenAlert] = React.useState(false);

  return (
    <>
      <div className="flex space-x-2">
        {children}
        {showSave && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                disabled={isLoading}
                variant="default"
                size="sm"
                type="submit"
                className="flex"
              >
                Save
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save</p>
            </TooltipContent>
          </Tooltip>
        )}

        {showEdit && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size={withText ? "sm" : "icon"}
                onClick={() =>
                  onEditRedirectTo ? onEditRedirectTo(data?.id ?? 0) : {}
                }
              >
                <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {withText && "Delete"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        )}

        {showDelete && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size={withText ? "sm" : "icon"}
                onClick={() => setOpenAlert(true)}
              >
                <Trash2 className="h-4 w-4 text-white dark:text-red-400" />
                {withText && "Delete"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <DeleteAlert
        title={`Delete ${tableName as string}`}
        description={`Are you sure you want to delete this ${
          tableName as string
        }? This action cannot be undone.`}
        onDelete={() => deleteOne(tableName, data?.id ?? 0)}
        mutateKey={`${tableName as string}-delete-${data?.id}`}
        onOpenChange={setOpenAlert}
        open={openAlert}
      />
    </>
  );
}
