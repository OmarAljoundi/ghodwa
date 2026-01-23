'use client';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';

interface DeleteAlertProps extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  title: string;
  description: string;
  onDelete: () => Promise<{ success: boolean; message?: string }>;
  mutateKey: string;
}

export default function DeleteAlert({
  title,
  description,
  onDelete,
  mutateKey,
  ...rest
}: DeleteAlertProps) {
  const route = useRouter();
  const { mutate, data, isPending } = useMutation({
    mutationFn: async () => onDelete(),
    mutationKey: [mutateKey],
    onSuccess({ success, message }) {
      if (success) {
        toast.success('Delete successfully');
        route.refresh();
        rest.onOpenChange?.(false);
        return;
      }
      toast.error(message);
      return message;
    },
  });

  return (
    <AlertDialog {...rest}>
      <AnimatePresence>
        {rest.open && (
          <AlertDialogContent forceMount >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                  <motion.div
                    initial={{ rotate: -90 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                  >
                    <AlertTriangle className="h-5 w-5" />
                  </motion.div>
                  {title}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-foreground">
                  {description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <motion.hr
                className="my-4 border-destructive/20"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
              <AnimatePresence>
                {data?.success === false && data?.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-4 p-3 bg-destructive/10 rounded-md flex items-center"
                  >
                    <XCircle className="size-5 text-destructive mr-2 flex-shrink-0 " />
                    <p className="text-sm text-destructive">{data?.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <AlertDialogFooter className="sm:justify-start">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => mutate()}
                    disabled={isPending}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">Delete</span>
                    <motion.div
                      className="absolute inset-0 bg-red-800"
                      initial={{ y: '100%' }}
                      whileHover={{ y: 0 }}
                      transition={{
                        type: 'tween',
                        ease: 'easeInOut',
                        duration: 0.3,
                      }}
                    />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => rest.onOpenChange?.(false)}
                    disabled={isPending}
                    className="mt-2 sm:mt-0 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Cancel</span>
                    <motion.div
                      className="absolute inset-0 bg-gray-200 dark:bg-gray-800"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{
                        type: 'tween',
                        ease: 'easeInOut',
                        duration: 0.3,
                      }}
                    />
                  </Button>
                </motion.div>
              </AlertDialogFooter>
            </motion.div>
          </AlertDialogContent>
        )}
      </AnimatePresence>
    </AlertDialog>
  );
}
