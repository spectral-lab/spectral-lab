import plotly.offline as py
import plotly.graph_objs as go
import numpy as np
from os import path
from typing import Tuple, List


def export_graph(img: np.ndarray, title: str, out_dir: str = './output/graphs/') -> None:
    """
    Generate graphs. Export them as html file into out_dir
    """
    data = [go.Heatmap(z=img)]

    layout = go.Layout(
        title=title,
        height=800,
        margin=dict(
            l=0,
            r=0,
            b=0,
            t=0
        ),
        xaxis=dict(
            title='Time',
            ticklen=5,
            gridwidth=2,
        ),
        yaxis=dict(
            title='Frequency',
            type='log',
            ticklen=5,
            gridwidth=2,
        )
    )

    py.plot(go.Figure(data, layout), filename=path.join(out_dir, title + '.html'))


def export_3d_scatter(points: np.ndarray, title: str, out_dir: str = './output/graphs/') -> None:
    """
    Generate graphs. Export them as html file into out_dir
    :param points: X value will be taken from points[:, 0], Y from points[:, 1], and Z from points[:, 2]
    :param title
    :param out_dir
    """
    data = [go.Scatter3d(
        x=points[:, 0],
        y=np.log(points[:, 1]),
        z=points[:, 2],
        mode='markers',
        marker=dict(
            size=6,
            line=dict(
                color='rgba(217, 217, 217, 0.14)',
                width=0.5
            ),
            opacity=0.8
        )
    )]

    layout = go.Layout(
        title=title,
        height=800,
        margin=dict(
            l=0,
            r=0,
            b=0,
            t=0
        ),
    )

    py.plot(go.Figure(data, layout), filename=path.join(out_dir, title + '.html'))


def feature_lines_to_image(feature_lines: List[np.ndarray], shape: Tuple) -> np.ndarray:
    """
    Returns 2d numpy array which can be passed into export_graph function
    :return: Each element is a number which indicates background as -1 and feature line as index starts from 0.
    """
    ret_img = np.zeros(shape) - 1
    for line_idx, line in enumerate(feature_lines):
        for i in range(line.shape[0]):
            row = int(round(line[i, 1]))
            column = int(round(line[i, 0]))
            ret_img[row, column] = line_idx

    return ret_img
