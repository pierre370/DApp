import { TableBody, TableCell, TableRow } from "@mui/material";
import DialogColumn from "./DialogColumn";
import EnhancedTableHead from "./Head";
import { StyledTableCell, StyledTableRow } from "./Style";

const BodyTable = (props) => {
    const { page, dense, rows, rowsPerPage, columns, dialogComponent } = props

    const stableSort = (array) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
          return a[1] - b[1];
        })
        return stabilizedThis.map((el) => el[0]);
    }
    
    const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    return (
        <>
            <EnhancedTableHead
              rowCount={rows.length}
              headCells={columns}
            />
            <TableBody>
              {stableSort(rows)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                        <StyledTableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                        >
                            {row.name}
                        </StyledTableCell>
                        {columns.map(x => {
                          for (const [key, value] of Object.entries(row)) {
                            if (x.field === key && x.field !== 'name') {
                              return <StyledTableCell align="right">{value}</StyledTableCell>
                            }
                          }
                        })}
                        {dialogComponent && (
                          <StyledTableCell align="right">
                          <DialogColumn row={row} dialogComponent={dialogComponent} /> 
                        </StyledTableCell>
                        )} 
                    </StyledTableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
        </>
    )
}

export default BodyTable
