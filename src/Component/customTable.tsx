"use client"
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
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
import { Button, ButtonGroup, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';

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
			<TableRow key={'tablehead'}>
				<TableCell padding="checkbox" />
				{props.headCells.map((headCell: any) => (
					<TableCell
						key={'tableheadCell' + headCell.id}
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
	button?: JSX.Element;
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
			{(numSelected > 0 && props.button) && (
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

function AdvancedTooltip(): JSX.Element {
	const [selectedButton, setSelectedButton] = useState<string>('all')
	const [selectedSelect, setSelectedSelect] = useState<string>('all')

	function handleChange(_: any, val: string) {
		setSelectedButton(val)
	}

	function handleSelectChange(event: any, _: any) {
		setSelectedSelect(event.target.value as string)
	}

	return (
		<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, }} >
			<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width: "100%", paddingX: 1}}>
				<Tooltip title="Graduate Status">
					<ToggleButtonGroup
						color="primary"
						value={selectedButton}
						exclusive
						onChange={handleChange}

						aria-label="Platform"
					>
						<ToggleButton value="all" size="large">All</ToggleButton>
						<ToggleButton value="phd" size="large">Ph.D</ToggleButton>
						<ToggleButton value="graduate" size="large">Graduate</ToggleButton>
						<ToggleButton value="undergraduate" size="large">Undergraduate</ToggleButton>
					</ToggleButtonGroup>
				</Tooltip>
				<Tooltip title="Search By Applicant Name">
					<FormControl sx={{ m: 1 }} variant="outlined">
						<InputLabel htmlFor="outlined-adornment-password">Name</InputLabel>
						<OutlinedInput
							id="outlined-adornment-password"
							type={'text'}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										edge="end"
									>
										<SearchIcon />
									</IconButton>
								</InputAdornment>
							}
							label="Password"
						/>
					</FormControl>
				</Tooltip>
				<Tooltip title="Filter by Application Status" placement="top">
					<FormControl>
						<InputLabel id="demo-simple-select-label">Status</InputLabel>
						<Select
							value={selectedSelect}
							label="Status"
							onChange={handleSelectChange}
							sx={{ width: 'max-content' }}
						>
							<MenuItem value={'all'}>Any</MenuItem>
							<MenuItem value={'Pending'}>Pending</MenuItem>
							<MenuItem value={'Accepted'}>Accepted</MenuItem>
						</Select>
					</FormControl>
				</Tooltip>
			</Stack>
		</Toolbar>
	)
}

export function EnhancedTable({ rows, headCells, title, button, advancedTooltip, onRowSelect, selectionKey }: { rows: any[], headCells: HeadCell[], title: string, button?: JSX.Element, advancedTooltip?: boolean, onRowSelect: (row: any) => void, selectionKey:any }) {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<string>('id');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [selected, setSelected] = React.useState<number | undefined>(undefined);

	const handleRequestSort = (
		event: React.MouseEvent<unknown>,
		property: string,
	) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	React.useEffect(() => {
		setSelected(undefined);
	}, [selectionKey]);

	const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
		const isSelected = selected === id;
		if (isSelected) {
			setSelected(undefined);
			onRowSelect(null);
		} else {
			setSelected(id);
			const selectedRow = rows.find((row) => row.id === id);
			if (selectedRow) {
				onRowSelect(selectedRow);
			}
		}
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	console.log("here")
	console.log(rows)
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
				{advancedTooltip && <AdvancedTooltip />}
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
										key={'tableBody' + index}
										hover
										onClick={(event: any) => handleClick(event, row.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell key={'checkbox'} padding="checkbox">
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
											key={'idLabel'}
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
											return <TableCell key={'headCells' + idx} align="right">{row[headCells[idx].id]}</TableCell>
										})}
									</TableRow>
								);
							})}
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
