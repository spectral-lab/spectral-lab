import os
from typing import Callable
from pdb import set_trace


def iter_all_files(mock_dir: str) -> Callable[[str], any]:
    """
    This should be used as decorator. Pass full filepath to decorated function. ex: @iter_all_files("path/to/mock/dir")
    """

    def decorator_iter_all_files(func: Callable[[str], any]) -> Callable[[str], any]:
        def wrapper(*original_arg: str):
            dir_name = format_as_dir(mock_dir)
            files = os.listdir(dir_name)
            for filename in files:
                if filename == ".DS_Store":
                    continue
                full_path = os.path.join(dir_name, filename)
                if original_arg:
                    print("file path of mock data is overrided by {}".format(full_path))
                func(full_path)

        return wrapper

    return decorator_iter_all_files


def format_as_dir(file_or_dir_name: str) -> str:
    if os.path.isfile(file_or_dir_name):
        return os.path.dirname(file_or_dir_name)

    if os.path.isdir(file_or_dir_name):
        return file_or_dir_name

    raise Exception('{} does not exist'.format(file_or_dir_name))
