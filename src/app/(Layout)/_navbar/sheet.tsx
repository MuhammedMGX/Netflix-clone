import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

// ...existing code...

<Dialog>
  <DialogContent>
    <VisuallyHidden>
      <DialogTitle>Accessible Title</DialogTitle>
    </VisuallyHidden>
    {/* ...existing dialog content... */}
  </DialogContent>
</Dialog>

// ...existing code...