"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "./table";
import { SortableHeader, SortDirection } from "./sortable-header";
import { Pagination } from "./pagination";
import { FilterBar, ActiveFilter } from "./filter-bar";
import { Search } from "./search";
import Checkbox from "../ui/checkbox";
import Skeleton from "../ui/skeleton";
import { EmptyState } from "./empty-state";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
} from "../overlay/dropdown";
import Button from "../ui/button";
import { Columns, MoreVertical } from "lucide-react";

export interface ColumnDef<T> {
  id: string;
  header: React.ReactNode;
  accessorKey?: keyof T;
  cell?: (row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: { label: string; value: string }[];
  hidden?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  getRowId?: (row: T, index: number) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  loading?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  variant?: "default" | "bordered" | "striped" | "glass" | "ios-glass";
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => React.ReactNode;
  className?: string;
}

export function DataTable<T extends object>({
  data = [],
  columns: initialColumns,
  getRowId = (_, idx) => `row-${idx}`,
  searchable = true,
  searchPlaceholder = "Search records...",
  loading = false,
  pageSize: initialPageSize = 5,
  pageSizeOptions = [5, 10, 20, 50],
  variant = "ios-glass",
  onRowClick,
  rowActions,
  className,
}: DataTableProps<T>) {
  // State management
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(initialPageSize);
  const [selectedRowIds, setSelectedRowIds] = React.useState<Set<string>>(new Set());

  // Safe sub-variant for controls that don't support "striped"
  const subVariant = variant === "striped" ? "default" : variant;

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    initialColumns.forEach((col) => {
      initial[col.id] = !col.hidden;
    });
    return initial;
  });

  // Filter state
  const [columnFilters, setColumnFilters] = React.useState<Record<string, string>>({});

  // Visible columns filtering
  const visibleColumns = React.useMemo(() => {
    return initialColumns.filter((col) => columnVisibility[col.id]);
  }, [initialColumns, columnVisibility]);

  // Handle column visibility toggle
  const toggleColumnVisibility = (colId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [colId]: !prev[colId],
    }));
  };

  // Handle column filter change
  const setFilter = (colId: string, val: string) => {
    setColumnFilters((prev) => {
      if (!val) {
        const next = { ...prev };
        delete next[colId];
        return next;
      }
      return { ...prev, [colId]: val };
    });
    setCurrentPage(1);
  };

  const activeFilterChips = React.useMemo(() => {
    const list: ActiveFilter[] = [];
    Object.entries(columnFilters).forEach(([colId, val]) => {
      const col = initialColumns.find((c) => c.id === colId);
      const label = typeof col?.header === "string" ? col.header : colId;
      list.push({ id: colId, label, value: val });
    });
    return list;
  }, [columnFilters, initialColumns]);

  // Filter & Search processing
  const processedData = React.useMemo(() => {
    let result = [...data];

    // Global Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          String(val ?? "").toLowerCase().includes(q)
        )
      );
    }

    // Column Filters
    Object.entries(columnFilters).forEach(([colId, filterVal]) => {
      const col = initialColumns.find((c) => c.id === colId);
      if (!col) return;
      result = result.filter((row) => {
        const cellVal = col.accessorKey ? row[col.accessorKey] : "";
        return String(cellVal ?? "").toLowerCase() === filterVal.toLowerCase();
      });
    });

    // Sorting
    if (sortKey && sortDirection) {
      const col = initialColumns.find((c) => c.id === sortKey);
      if (col && col.accessorKey) {
        const key = col.accessorKey;
        result.sort((a, b) => {
          const valA = (a[key] as unknown as string | number) ?? "";
          const valB = (b[key] as unknown as string | number) ?? "";
          if (valA < valB) return sortDirection === "asc" ? -1 : 1;
          if (valA > valB) return sortDirection === "asc" ? 1 : -1;
          return 0;
        });
      }
    }

    return result;
  }, [data, searchQuery, columnFilters, sortKey, sortDirection, initialColumns]);

  // Pagination processing
  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize));
  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedData.slice(start, start + pageSize);
  }, [processedData, currentPage, pageSize]);

  // Row Selection logic
  const isAllSelected = React.useMemo(() => {
    if (paginatedData.length === 0) return false;
    return paginatedData.every((row, idx) =>
      selectedRowIds.has(getRowId(row, idx))
    );
  }, [paginatedData, selectedRowIds, getRowId]);

  const toggleSelectAll = () => {
    const next = new Set(selectedRowIds);
    if (isAllSelected) {
      paginatedData.forEach((row, idx) => next.delete(getRowId(row, idx)));
    } else {
      paginatedData.forEach((row, idx) => next.add(getRowId(row, idx)));
    }
    setSelectedRowIds(next);
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(selectedRowIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedRowIds(next);
  };

  return (
    <div className={cn("w-full space-y-4 select-none", className)}>
      {/* Toolbar: Search, Filters, Column Visibility */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {searchable && (
          <div className="flex-1 max-w-sm">
            <Search
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              variant={subVariant}
            />
          </div>
        )}

        <div className="flex items-center justify-end gap-2 shrink-0">
          {/* Column Visibility Menu */}
          <Dropdown variant={subVariant} align="right">
            <DropdownTrigger>
              <Button
                variant="outline"
                size="sm"
                leftIcon={<Columns size={15} />}
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownContent className="w-44">
              <DropdownLabel>Toggle Columns</DropdownLabel>
              {initialColumns.map((col) => (
                <div
                  key={col.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleColumnVisibility(col.id);
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-xl text-xs cursor-pointer"
                >
                  <Checkbox
                    checked={columnVisibility[col.id]}
                    onChange={() => {}}
                    size="sm"
                  />
                  <span>
                    {typeof col.header === "string" ? col.header : col.id}
                  </span>
                </div>
              ))}
            </DropdownContent>
          </Dropdown>
        </div>
      </div>

      {/* Active Filter Bar */}
      {(activeFilterChips.length > 0 || initialColumns.some((c) => c.filterable)) && (
        <FilterBar
          activeFilters={activeFilterChips}
          onRemoveFilter={(colId) => setFilter(colId, "")}
          onClearAll={() => setColumnFilters({})}
          variant={subVariant}
        >
          {initialColumns
            .filter((c) => c.filterable && c.filterOptions)
            .map((c) => (
              <select
                key={c.id}
                value={columnFilters[c.id] || ""}
                onChange={(e) => setFilter(c.id, e.target.value)}
                className="bg-white/60 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs rounded-xl px-2 py-1 outline-none text-zinc-900 dark:text-zinc-100 font-medium cursor-pointer"
              >
                <option value="">Filter {typeof c.header === "string" ? c.header : c.id}</option>
                {c.filterOptions?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ))}
        </FilterBar>
      )}

      {/* Row Selection Count Banner */}
      {selectedRowIds.size > 0 && (
        <div className="flex items-center justify-between p-2.5 px-4 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200 text-xs font-medium">
          <span>{selectedRowIds.size} row(s) selected</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSelectedRowIds(new Set())}
            className="text-xs h-6 px-2 text-blue-600 dark:text-blue-400"
          >
            Deselect All
          </Button>
        </div>
      )}

      {/* Main Table Structure */}
      <Table variant={variant}>
        <TableHeader>
          <TableRow>
            <TableCell className="w-10 text-center">
              <Checkbox
                checked={isAllSelected}
                onChange={toggleSelectAll}
                size="sm"
              />
            </TableCell>

            {visibleColumns.map((col) => {
              if (col.sortable) {
                return (
                  <SortableHeader
                    key={col.id}
                    sortDirection={sortKey === col.id ? sortDirection : false}
                    onSort={(dir) => {
                      setSortKey(dir ? col.id : null);
                      setSortDirection(dir);
                    }}
                  >
                    {col.header}
                  </SortableHeader>
                );
              }
              return (
                <TableCell key={col.id} className="font-semibold">
                  {col.header}
                </TableCell>
              );
            })}

            {rowActions && <TableCell className="w-10" />}
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            Array.from({ length: pageSize }).map((_, idx) => (
              <TableRow key={`skeleton-${idx}`}>
                <TableCell className="text-center">
                  <Skeleton variant="rect" width={16} height={16} />
                </TableCell>
                {visibleColumns.map((col) => (
                  <TableCell key={col.id}>
                    <Skeleton variant="text" width="80%" />
                  </TableCell>
                ))}
                {rowActions && <TableCell />}
              </TableRow>
            ))
          ) : paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length + (rowActions ? 2 : 1)}>
                <EmptyState
                  variant={subVariant}
                  title="No records matching criteria"
                  description="Try adjusting your search keywords or active filters."
                  action={
                    (searchQuery || Object.keys(columnFilters).length > 0) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSearchQuery("");
                          setColumnFilters({});
                        }}
                      >
                        Clear Filters
                      </Button>
                    )
                  }
                />
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, idx) => {
              const rowId = getRowId(row, idx);
              const isSelected = selectedRowIds.has(rowId);

              return (
                <TableRow
                  key={rowId}
                  selected={isSelected}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && "cursor-pointer")}
                >
                  <TableCell
                    className="text-center"
                    onClick={(e) => toggleSelectRow(rowId, e)}
                  >
                    <Checkbox checked={isSelected} size="sm" />
                  </TableCell>

                  {visibleColumns.map((col) => {
                    const cellContent = col.cell
                      ? col.cell(row, idx)
                      : col.accessorKey
                      ? String(row[col.accessorKey] ?? "")
                      : null;

                    return <TableCell key={col.id}>{cellContent}</TableCell>;
                  })}

                  {rowActions && (
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Dropdown variant={subVariant} align="right">
                        <DropdownTrigger>
                          <button
                            type="button"
                            className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-500"
                          >
                            <MoreVertical size={16} />
                          </button>
                        </DropdownTrigger>
                        <DropdownContent className="w-36">
                          {rowActions(row)}
                        </DropdownContent>
                      </Dropdown>
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>

      {/* Pagination Footer */}
      {!loading && processedData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={processedData.length}
          pageSize={pageSize}
          pageSizeOptions={pageSizeOptions}
          onPageChange={setCurrentPage}
          onPageSizeChange={(sz) => {
            setPageSize(sz);
            setCurrentPage(1);
          }}
          variant={subVariant}
        />
      )}
    </div>
  );
}

export default DataTable;
