import datetime
import pytz
from pdb import set_trace
import numpy as np
from unittest import TestCase
from .. import segmentize, check_format, compute_seeds, export_graph, \
    feature_lines_to_image, compute_feature_lines, extract_training_points
from .helpers import iter_all_files
import os

__dirname__ = os.path.dirname(__file__)

line_continuity = 0
sensitivity = 5  # This will be taken from the request from client
proportion_of_hottest_area = 4 ** (sensitivity * 0.4) / 5000
proportion_of_coldest_area = 0.5
degree = 1  # This will be taken from the request from client


class TestOverallProcess(TestCase):
    def test_overall_process(self):
        @iter_all_files(__dirname__ + "/data/spectrogram")
        def main(filepath):
            def export_intermediate_data_as_graph():
                filename = os.path.splitext(os.path.basename(filepath))[0]
                export_graph(spectrogram,
                             filename + "_spectrogram")  # ex: spectrogram_20190417_0910
                export_graph(markers, filename + "_markers")
                export_graph(segment_labels, filename + "_segment_labels")
                export_graph(feature_lines_to_image(feature_lines, spectrogram.shape), filename + "_feature_lines")

            # print('Now testing with ' + filepath)
            spectrogram = np.load(filepath)
            check_result = check_format(spectrogram)
            if not check_result["is_ok"]:
                print("bad format")
                print(check_result['msg'])
                return check_result['msg']
            markers = compute_seeds(spectrogram, proportion_of_hottest_area, proportion_of_coldest_area)
            segment_labels = segmentize(spectrogram, markers, line_continuity)
            training_points = extract_training_points(segment_labels, spectrogram, pass_rate=0.3)
            feature_lines = compute_feature_lines(training_points, degree)

            export_intermediate_data_as_graph()  # Optional

        main()
