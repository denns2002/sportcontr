import shlex
import subprocess
import time


def create_vm_by_YandexCloud():
    commands = (
        ('curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash', [], 0),
        # ('source "/home/sportconstr/.bashrc"', []),
        ("RUN NEW SHELL", [], 1),
        ('yc init', ['y0_AgAAAABZQeGDAATuwQAAAAEQNIFiAAAgCdwTcpFC9ahOVrfaQAc1787OHA', '1', 'Y', '1'], 0),
        ('ssh-keygen -t rsa -f "$HOME/.ssh/id_rsa_2" -N "" && cat ~/.ssh/id_rsa_2.pub', [], 0),
        ('yc compute instance create --zone ru-central1-a --memory 2 --cores 2 --core-fraction 20 --platform standard-v3 --network-interface subnet-name=default-ru-central1-a,nat-ip-version=ipv4 --ssh-key ~/.ssh/id_rsa_2.pub', [], 0),
    )

    for c, i, new_console in commands:
        if new_console:
            proc = subprocess.Popen(
                shlex.split("""bash &"""),
                stdout=subprocess.PIPE,
                shell=True,
            )
            proc.wait()
        else:
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

            print("INPUT=:", c)

            # else:
            time.sleep(3)
            input1 = "\n".join(i)
            print("INPUT=:", input1)
            stdout, stderr = proc.communicate(input=input1, timeout=3)
            print("O=:", stdout)
            proc.wait()
    input('end')


        # print("TINPUT=:", i_2)
        # print(i_2, file=proc.stdin, flush=True)
        # for line in proc.stdout:
        #     print("O=:", line)
        # for line in proc.stderr:
        #     print("E=:", line)
    time.sleep(3)


create_vm_by_YandexCloud()
# ('yc config set token y0_AgAAAABZQeGDAATuwQAAAAEQNIFiAAAgCdwTcpFC9ahOVrfaQAc1787OHA', []),
# ('ssh-keygen -t rsa -C "$HOSTNAME" -y -f "$HOME/.ssh/id_rsa_2" -N "" && cat ~/.ssh/id_rsa_2.pub', []),
# ('ssh-keygen -t rsa -y -f ~/.ssh/id_ed25519_2 -N ""', []),

# ('exec -l $SHELL', []),