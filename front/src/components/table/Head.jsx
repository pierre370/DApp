import { TableHead, TableRow, TableSortLabel } from "@mui/material"
import { StyledTableCell } from "./Style"

const EnhancedTableHead = (props) => {
    const { headCells } = props
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <StyledTableCell
              key={headCell.field}
              align={headCell.field === 'name' ? 'left' : 'right'}
              padding={headCell.flex === 1 ? 'normal' : 'none'}
            >
              <TableSortLabel>{headCell.headerName}</TableSortLabel>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    )
}
  
export default EnhancedTableHead
