from collections.abc import Generator
from typing import Any

COORD_RE: Any
COL_RANGE: str
ROW_RANGE: str
RANGE_EXPR: str
ABSOLUTE_RE: Any
SHEET_TITLE: str
SHEETRANGE_RE: Any

def get_column_interval(start: str | int, end: str | int) -> list[str]: ...
def coordinate_from_string(coord_string: str) -> tuple[str, int]: ...
def absolute_coordinate(coord_string: str) -> str: ...

col: Any

def get_column_letter(idx: int) -> str: ...
def column_index_from_string(str_col: str) -> int: ...
def range_boundaries(range_string: str) -> tuple[int, int, int, int]: ...
def rows_from_range(range_string) -> Generator[Any, None, None]: ...
def cols_from_range(range_string) -> Generator[Any, None, None]: ...
def coordinate_to_tuple(coordinate: str) -> tuple[int, int]: ...
def range_to_tuple(range_string: str) -> tuple[str, tuple[int, int, int, int]]: ...
def quote_sheetname(sheetname: str) -> str: ...
