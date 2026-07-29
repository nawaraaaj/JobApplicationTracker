import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

interface ConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: "default" | "destructive";
    isLoading?: boolean;
    onConfirm: () => void;
}

export function ConfirmDialog({
    open,
    onOpenChange,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    variant = "default",
    isLoading = false,
    onConfirm,
}: ConfirmDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="rounded-none border border-[#050e1a]/15 bg-[#fcf9f9]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="font-mono text-[16px] font-semibold tracking-[0.02em] text-[#050e1a]">
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-mono text-[13px] text-[#050e1a]/60">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isLoading}
                        className="rounded-none border border-[#050e1a]/15 bg-transparent font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#050e1a] hover:bg-[#050e1a]/5"
                    >
                        {cancelLabel}
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        className={
                            variant === "destructive"
                                ? "gap-1.5 rounded-none border border-red-700 bg-red-700 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#fcf9f9] hover:bg-red-800 hover:border-red-800"
                                : "gap-1.5 rounded-none border border-[#050e1a] bg-[#050e1a] font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[#fcf9f9] hover:bg-[#835500] hover:border-[#835500]"
                        }
                    >
                        {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        {confirmLabel}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}