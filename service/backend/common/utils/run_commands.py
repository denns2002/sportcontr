import shlex
import subprocess
import time

from config.settings import BASE_DIR


def open_file(filename: str):
    with open(f'{BASE_DIR / filename}', 'r', encoding='utf-8') as f:
        res = f.readlines()
        print(res)
        return res


def run_commands(commands=[]):
    for c in commands:
        proc = subprocess.Popen(
            c,
            stdin=subprocess.PIPE,
            stderr=subprocess.PIPE,
            stdout=subprocess.PIPE,
            shell=True,
            executable='/bin/bash',
            bufsize=1,
            text=True

        )
    time.sleep(3)

# def run_commands(commands=[]):
#     for c, i, new_console in commands:
#         if new_console:
#             proc = subprocess.Popen(
#                 shlex.split("""bash &"""),
#                 stdout=subprocess.PIPE,
#                 shell=True,
#             )
#             proc.wait()
#         else:
#             proc = subprocess.Popen(
#                 c,
#                 stdin=subprocess.PIPE,
#                 stderr=subprocess.PIPE,
#                 stdout=subprocess.PIPE,
#                 shell=True,
#                 executable='/bin/bash',
#                 bufsize=1,
#                 text=True
#
#             )
#
#             print("INPUT=:", c)
#
#             time.sleep(3)
#             input_user = "\n".join(i)
#             print("INPUT=:", input_user)
#             stdout, stderr = proc.communicate(input=input_user, timeout=3)
#             print("O=:", stdout)
#             proc.wait()
#
#     time.sleep(3)

