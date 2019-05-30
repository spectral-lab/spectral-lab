from typing import List


def flatten_list(x: List) -> List:
    return [z for y in x for z in (flatten_list(y) if hasattr(y, '__iter__') and not isinstance(y, str) else (y,))]
