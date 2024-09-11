import subprocess
import time

from config.settings import BASE_DIR


def read_vm_ip(lines):
    for i, v in enumerate(lines):
        if "one_to_one_nat:" in v:
            return lines[i+1][lines[i+1].find(': ') + 2:].rstrip()


def change_docker_compose_conf(user, new_conf: str = 'new-docker-compose.yml'):
    lines = open_file('docker-compose.yml')
    fields = {
        'ADMIN_LOGIN': user.username,
        'ADMIN_EMAIL': user.email,
        'ADMIN_FIRST_NAME': user.first_name,
        'ADMIN_LAST_NAME': user.last_name,
    }
    for f, v in fields.items():
        lines.insert(11, f'            - {f}={v}\n')

    with open(f'{BASE_DIR / new_conf}', 'w', encoding='utf-8') as f:
        f.writelines(lines)

    return BASE_DIR / new_conf


def generate_yc_create(docker_compose_filepath: str = ""):
    command = f"{open_file('create_vm')[0].rstrip()} --docker-compose-file {docker_compose_filepath}"

    return command


def open_file(filename: str):
    with open(f'{BASE_DIR / filename}', 'r', encoding='utf-8') as f:
        lines = f.readlines()

        return lines


def run_command(command):
    print(command)
    proc = subprocess.Popen(
        command,
        stdin=subprocess.PIPE,
        stderr=subprocess.PIPE,
        stdout=subprocess.PIPE,
        shell=True,
        executable='/bin/bash',
        bufsize=1,
        text=True

    )
    time.sleep(3)

    return proc.stdout.readlines()


def run_commands(commands=[]):
    for c in commands:
        run_command(c)


