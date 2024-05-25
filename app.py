# 导入flask相关模块
from flask import Flask, Response, request, render_template
from flask_cors import *
import os
import time
from datetime import datetime
# 导入 预测模块
from predict import yuce
from predict_once import predict_once

app = Flask(__name__)


# CORS(app, supports_credentials=True, resources=r"/*")

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")


@app.route("/2", methods=['GET'])
def about():
    return render_template("about.html")


@app.route("/3", methods=['GET'])
def platform():
    return render_template("platform.html")


@app.route("/4", methods=['GET'])
def login():
    return render_template("login.html")


@app.route("/image/<name>", methods=['GET'])
def show(name):
    img_path = r'image\\' + name
    # 获取文件后缀名
    suffix = name.split('.')[-1]
    # 将文件以二进制形式打开
    file = open(img_path, "rb").read()
    # 将文件返回给前端
    return Response(file, mimetype='image/' + suffix)


@app.route("/result/<name>", methods=['GET'])
def show1(name):
    img_path = r'result\\' + name
    # 获取文件后缀名
    suffix = name.split('.')[-1]
    # 将文件以二进制形式打开
    file = open(img_path, "rb").read()
    # 将文件返回给前端
    return Response(file, mimetype='image/' + suffix)


# 单帧图片上传
@app.route('/imageUpload', methods=['POST'])
@cross_origin()
def imageUpdateHandle():
    # 从 post 请求中获取图片数据
    img = request.files.get('img')
    # 获取文件后缀名
    suffix = '.' + img.filename.split('.')[-1]
    # 获取当前文件路径
    basedir = os.path.abspath(os.path.dirname(__file__))
    now = datetime.now()
    timeStr = now.strftime("%Y-%m-%d-%H.%M.%S")
    # 图片名称
    img_name = timeStr + suffix
    # 拼接相对路径
    photo_relative_pos = '\\image\\' + img_name
    # 当前文件路径 + 相对路径 ==> 完整保存路径，使用时间戳命名文件以防止图片命名重复
    img_path = basedir + photo_relative_pos
    # 保存图片
    img.save(img_path)
    img_url = 'http://127.0.0.1:5000/image/' + img_name
    # 将完整路径传入预测单帧函数
    tempVal = predict_once(img_path)
    return {
        'msg': 'ok',
        'img_url': img_url,
        'tempVal': tempVal
    }


@app.route('/dirUpload', methods=['POST'])
@cross_origin()
def save_dir():
    image_files = request.files.getlist("dir")
    # 获取当前文件路径
    basedir = os.path.abspath(os.path.dirname(__file__))
    # timeStr = str(int(time.time()))
    now = datetime.now()
    timeStr = now.strftime("%Y-%m-%d-%H.%M.%S")
    dir = basedir + "\\imgDir\\" + timeStr + "\\";

    # 如果不存在对应的文件夹则创建
    if not os.path.exists(os.path.dirname(dir)):
        os.makedirs(os.path.dirname(dir))

    # 从文件列表依次取出并保存，文件名与上传时一致
    for image_file in image_files:
        # image_file.save()
        img_name = image_file.filename.split('/')[-1]
        save_location = dir + img_name
        # image_file.save(os.path.join(app.config['UPLOAD_FOLDER'], 5))/
        image_file.save(save_location)

    img_url = yuce(test_path=dir, result_name=timeStr)
    return {
        'msg': 'ok',
        'img_url': img_url
    }


if __name__ == '__main__':
    app.run(port=5000)
