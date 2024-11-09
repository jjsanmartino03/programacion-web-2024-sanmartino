import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import LoadingButton from "@/components/buttons/loading-button";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  loading?: boolean;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
                                                               loading,
                                                               isOpen,
                                                               onClose,
                                                               onConfirm,
                                                               title,
                                                               description
                                                             }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>{description}</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <LoadingButton onClick={onConfirm} loading={loading} variant="destructive">
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;