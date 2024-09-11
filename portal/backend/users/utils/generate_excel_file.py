import time

import numpy as np
import pandas as pd

from config.settings import BASE_DIR, MEDIA_ROOT


def generate_excel_file(json_list):
    users = {
        'first_name': [user['first_name'] for user in json_list],
        'last_name': [user['last_name'] for user in json_list],
        'middle_name': [user['middle_name'] for user in json_list],
        'birth_date':  [user['birth_date'].strftime('%m/%d/%Y') for user in json_list],
        'username': [user['username'] for user in json_list],
        'password':  [user['password'] for user in json_list],
    }
    df = pd.DataFrame(users)
    filepath = f'{BASE_DIR / MEDIA_ROOT}\\excel_users{time.time()}.xlsx'
    df.to_excel(filepath)

    return filepath
