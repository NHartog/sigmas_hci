"use client"
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (
	a: { [key in Key]: number | string },
	b: { [key in Key]: number | string },
) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export interface HeadCell {
	disablePadding: boolean;
	id: string;
	label: string;
	numeric: boolean;
}

interface EnhancedTableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
	order: Order;
	orderBy: string;
	headCells: HeadCell[]
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, onRequestSort } =
		props;
	const createSortHandler =
		(property: string) => (event: React.MouseEvent<unknown>) => {
			onRequestSort(event, property);
		};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox" />
				{props.headCells.map((headCell: any) => (
					<TableCell
						key={headCell.id}
						align={'right'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
interface EnhancedTableToolbarProps {
	numSelected: number;
	title: string;
	button: JSX.Element;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected } = props;
	return (
		<Toolbar
			sx={[
				{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
				},
				numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				},
			]}
		>
			<Typography
				sx={{ flex: '1 1 100%' }}
				variant="h6"
				id="tableTitle"
				component="div"
			>
				{props.title}
			</Typography>
			{numSelected > 0 && (
				<>
					<Tooltip title="Add TA Preference">
						{props.button}
					</Tooltip>
				</>
			)
			}
		</Toolbar >
	);
}

export function EnhancedTable({ rows, headCells, title, button }: { rows: any[], headCells: HeadCell[], title: string, button: JSX.Element }) {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<string>('id');
	const [selected, setSelected] = React.useState<number>();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};


	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		setSelected(selected == id ? undefined : id)
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const visibleRows = React.useMemo(
		() =>
			[...rows]
				.sort(getComparator(order, orderBy))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[order, orderBy, page, rowsPerPage],
	);

	return (
		<Box sx={{ width: '100%' }}>
			<Paper sx={{ width: '100%', mb: 2 }} elevation={5}>
				<EnhancedTableToolbar numSelected={selected || -1} title={title} button={button} />
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={'medium'}
					>
						<EnhancedTableHead
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							headCells={headCells}
						/>
						<TableBody>
							{visibleRows.map((row, index) => {
								const isItemSelected = selected == row.id;
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event: any) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={row.id}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													'aria-labelledby': labelId,
												}}
											/>
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
											align="right"
										>
											{row[headCells[0].id]}
										</TableCell>
										{headCells.map((headCell: HeadCell, idx: number) => {
											if (idx == 0) {
												return <></>
											}
											return <TableCell align="right">{row[headCells[idx].id]}</TableCell>
										})}
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: 53 * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
