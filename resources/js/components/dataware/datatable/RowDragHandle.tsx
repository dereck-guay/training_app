import { useSortable } from '@dnd-kit/sortable';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
    const { attributes, listeners } = useSortable({
        id: rowId,
    });
    return (
        <button {...attributes} {...listeners}>
            <FontAwesomeIcon icon={faBars} />
        </button>
    );
};

export default RowDragHandleCell;
