import random
import string


def generate_random_str(length: int = 10) -> str:
    return ''.join(random.choices(
        string.ascii_uppercase + string.ascii_lowercase + string.digits,
        k=length
    ))
