from unittest import TestCase, skip
from .. import compute_seeds, export_graph
from .helpers import iter_all_files
import numpy as np
from random import random, randint
import os
from math import ceil
from ..constants import IGNORE_RATE
from pdb import set_trace
__dirname__ = os.path.dirname(os.path.realpath(__file__))


class TestComputeSeeds(TestCase):
    # @skip("")
    def test_with_9_items(self):
        mock_array = np.array(
            [[1, 2, 3],
             [4, 5, 6],
             [7, 8, 9]]
        ) * 0.1
        actual_marks = compute_seeds(mock_array, proportion_of_coldest_area=0.22, proportion_of_hottest_area=0.22)
        expected_marks = np.array(
            [[-1, -1, -1],
             [1, 1, 0],
             [0, 2, 2]]
        )

        is_equal = np.array_equal(actual_marks, expected_marks)
        if not is_equal:
            print()
            print(actual_marks)
        self.assertTrue(is_equal)

    # @skip("")
    def test_proportion_of_coldest_area(self):
        mock_array = np.random.rand(256).reshape(16, 16)
        expected_proportion = random() * 0.3
        seed_markers = compute_seeds(mock_array, proportion_of_coldest_area=expected_proportion)
        actual_proportion = seed_markers[seed_markers == 1].size / seed_markers.size
        is_acceptable = expected_proportion * 0.8 < actual_proportion < expected_proportion * 1.2
        if not is_acceptable:
            print()
            print("actual proportion:", actual_proportion)
            print("expected proportion: ", expected_proportion)
            print(seed_markers)
        self.assertTrue(is_acceptable)

    # @skip("")
    def test_proportion_of_hottest_area(self):
        mock_array = np.random.rand(512).reshape(32, 16)
        expected_proportion = random() * 0.3
        seed_markers = compute_seeds(mock_array, proportion_of_hottest_area=expected_proportion)
        actual_proportion = seed_markers[seed_markers == 2].size / seed_markers.size

        # assert
        is_acceptable = expected_proportion * 0.6 < actual_proportion < expected_proportion * 1.4
        if not is_acceptable:
            print()
            print("actual proportion:", actual_proportion)
            print("expected proportion: ", expected_proportion)
            print(seed_markers)
        self.assertTrue(is_acceptable)

    def test_proportion_of_ignore_area(self):
        mock_array = np.random.rand(randint(100, 800), randint(100, 800))
        expected_num_ignore_rows = ceil(mock_array.shape[0] * IGNORE_RATE)
        expected_proportion = expected_num_ignore_rows / mock_array.shape[0]
        seed_markers = compute_seeds(mock_array)
        actual_proportion = seed_markers[seed_markers == -1].size / seed_markers.size

        # assert
        is_acceptable = expected_proportion * 0.8 < actual_proportion < expected_proportion * 1.2
        if not is_acceptable:
            print()
            print("actual proportion: ", actual_proportion)
            print("expected proportion: ", expected_proportion)
            print(seed_markers)
        self.assertTrue(is_acceptable)

    @skip("")
    def test_with_real_data(self):
        @iter_all_files(__dirname__ + '/data/spectrogram')
        def check_reproducing_seed_markers(file_path):
            spectrogram_img = np.load(file_path)
            actual_seed_markers = compute_seeds(spectrogram_img)
            # np.save(os.path.join(__dirname__, "data/seed_markers", os.path.basename(file_path)), actual_seed_markers)
            path_to_pre_culculated_markers = os.path.join(__dirname__, "data/seed_markers", os.path.basename(file_path))
            expected_seed_markers = np.load(path_to_pre_culculated_markers)
            self.assertTrue(np.array_equal(actual_seed_markers, expected_seed_markers))

        check_reproducing_seed_markers()
