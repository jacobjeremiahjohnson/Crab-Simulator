import os

count = 0
for root_dir, cur_dir, files in os.walk(os.path.join(os.path.abspath(os.getcwd()), "..", "days")):
    count += len(files)

print(count)