import sys
import os

__dirname__ = os.path.dirname(__file__)
sys.path.append(os.path.normpath(os.path.join(__dirname__, "/modules")))

from PIL import Image
from skimage import img_as_float
import io
from flask import Flask, request, make_response
from flask_cors import CORS
import datetime
import pytz
import numpy as np
from pdb import set_trace

# noinspection PyPackageRequirements,PyUnresolvedReferences
from modules import segmentize, check_format, compute_seeds, export_graph, convert_to_json, \
    compute_feature_lines, extract_training_points, feature_lines_to_image

print('Success: Imported modules')

app = Flask(__name__)
CORS(app)


@app.route('/', methods=["POST"])
def handler():
    def export_intermediate_data_as_graph():
        export_graph(spectrogram,
                     formatted_now + "_spectrogram")  # ex: spectrogram_20190417_0910
        export_graph(markers, formatted_now + "_markers")
        export_graph(segment_labels, formatted_now + "_segment_labels")
        export_graph(feature_lines_to_image(training_points, spectrogram.shape), formatted_now + "_training_points")
        export_graph(feature_lines_to_image(feature_lines, spectrogram.shape), formatted_now + "_feature_lines")
        print("Success: Exported graphs")

    now = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))
    formatted_now = now.strftime("%Y%m%d_%H%M")

    print('Success: Got request')
    uploaded_img = request.files["pngImage"].read()
    # uploaded_img = request.data

    # Init params
    line_continuity = 0
    sensitivity = 5
    degree = 0
    if "sensitivity" in request.form:
        sensitivity = int(request.form['sensitivity'])
        print(':param sensitivity: ', sensitivity)
    if "degree" in request.form:
        degree = int(request.form['degree'])
        print(':param degree: ', degree)
    proportion_of_hottest_area = 10 ** -4.3 * sensitivity ** 3.3
    proportion_of_coldest_area = 0.8

    # Image.open(io.BytesIO(uploaded_img)).save(
    #     "./output/img/img_from_client" + formatted_now + ".png")  # Optional. For debugging
    image_data = Image.open(io.BytesIO(uploaded_img)).convert('L')
    spectrogram = img_as_float(image_data) / 255.
    # np.save(
    #     __dirname__
    #     + "/modules/test/data/spectrogram/"
    #     + formatted_now
    #     + ".npy", spectrogram)  # Optional. For making mock.
    check_result = check_format(spectrogram)
    if not check_result["is_ok"]:
        print("bad format")
        print(check_result['msg'])
        return check_result['msg']
    print('Success: Converted into ndarray')
    markers = compute_seeds(spectrogram, proportion_of_hottest_area, proportion_of_coldest_area)
    segment_labels = segmentize(spectrogram, markers, line_continuity)
    print('Success: Segmentized with ' + str(segment_labels.max() + 1) + " segments to extract peaks")
    training_points = extract_training_points(segment_labels, spectrogram, pass_rate=0.3)
    feature_lines = compute_feature_lines(training_points, degree)
    print('Success: Compute feature lines')
    ret = make_response(convert_to_json(feature_lines))

    # export_intermediate_data_as_graph()  # Optional

    print('Success: Returns')
    # print(feature_lines)  # Optional
    return ret

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=6220)