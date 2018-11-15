from flask import Flask, json, request, jsonify
from flask_cors import CORS, cross_origin
import csv


app = Flask(__name__)
cors = CORS(app)


@app.route('/api/file-reader/', methods=['PUT'])
@cross_origin()
def file_reader():
    path = request.json['filePath']
    print(path)

    with open(path) as f:
        reader = csv.DictReader(f)
        data = [dict(l) for l in reader]
    labels = list(data[0].keys())

    print(data[:5])
    print(labels)

    return jsonify({
        'path': path,
        'data': data,
        'labels': labels
    })


if __name__ == '__main__':
    app.run(debug=True)
