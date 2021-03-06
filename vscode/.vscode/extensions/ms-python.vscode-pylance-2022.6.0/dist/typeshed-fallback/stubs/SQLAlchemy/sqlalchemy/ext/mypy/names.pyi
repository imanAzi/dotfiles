from typing import Any
from typing_extensions import TypeAlias

from ...util import symbol

ClassDef: TypeAlias = Any  # from mypy.nodes
Expression: TypeAlias = Any  # from mypy.nodes
MemberExpr: TypeAlias = Any  # from mypy.nodes
NameExpr: TypeAlias = Any  # from mypy.nodes
SymbolNode: TypeAlias = Any  # from mypy.nodes
TypeInfo: TypeAlias = Any  # from mypy.nodes
SemanticAnalyzerPluginInterface: TypeAlias = Any  # from mypy.plugin
UnboundType: TypeAlias = Any  # from mypy.types

COLUMN: symbol
RELATIONSHIP: symbol
REGISTRY: symbol
COLUMN_PROPERTY: symbol
TYPEENGINE: symbol
MAPPED: symbol
DECLARATIVE_BASE: symbol
DECLARATIVE_META: symbol
MAPPED_DECORATOR: symbol
SYNONYM_PROPERTY: symbol
COMPOSITE_PROPERTY: symbol
DECLARED_ATTR: symbol
MAPPER_PROPERTY: symbol
AS_DECLARATIVE: symbol
AS_DECLARATIVE_BASE: symbol
DECLARATIVE_MIXIN: symbol
QUERY_EXPRESSION: symbol

def has_base_type_id(info: TypeInfo, type_id: int) -> bool: ...
def mro_has_id(mro: list[TypeInfo], type_id: int) -> bool: ...
def type_id_for_unbound_type(type_: UnboundType, cls: ClassDef, api: SemanticAnalyzerPluginInterface) -> int | None: ...
def type_id_for_callee(callee: Expression) -> int | None: ...
def type_id_for_named_node(node: NameExpr | MemberExpr | SymbolNode) -> int | None: ...
def type_id_for_fullname(fullname: str) -> int | None: ...
