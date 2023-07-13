import os.path

dir_name = os.path.dirname(__file__)
file_name = os.path.join(dir_name, "output")

if not os.path.exists(file_name):
    os.mkdir(file_name)

print(file_name)
