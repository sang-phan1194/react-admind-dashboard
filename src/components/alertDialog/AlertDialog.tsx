import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteDoc, doc } from 'firebase/firestore';
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters
} from 'react-query';
import { db } from '../../firebase';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  type: 'products' | 'calendarEvents';
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

export default function AlertDialog(props: Props) {
  const { refetch, id, open, setOpen, type } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (id: string) => {
    setOpen(false);
    await deleteDoc(doc(db, type, id));
    refetch();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{ fontSize: '18px', color: 'black', paddingTop: '20px' }}
          id="alert-dialog-title"
        >
          {'Alert!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: '15px', color: 'black' }}
          >
            {type === 'calendarEvents'
              ? 'Choose the options below:'
              : 'Are you sure to delete this product?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ padding: '25px' }}>
          <Button
            style={{ color: '#D83F31', border: '0.5px solid #D83F31' }}
            variant="outlined"
            onClick={() => handleConfirm(id)}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
