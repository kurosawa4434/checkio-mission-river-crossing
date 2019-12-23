"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

from random import randint, choice
from my_solution import river_crossing
# from pprint import pprint


def make_random_tests(num):
    random_tests = []

    for _ in range(num):
        payload = choice([1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 5])
        loads_total = choice([1, 2, 3, 3, 3, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10])
        # payload = randint(1, 10)
        # loads_total = randint(1, 100)
        wolves = randint(0, loads_total)
        goats = randint(0, loads_total - wolves)
        cabbages = loads_total - wolves - goats
        # loads = {'w': wolves, 'g': goats, 'c': cabbages}
        answer = river_crossing(wolves, goats, cabbages, payload)
        random_tests.append({'input': [wolves, goats, cabbages, payload],
                             'answer': answer, })

    # pprint(random_tests)
    return random_tests


TESTS = {
    "Basics": [
        {
            'input': [1, 1, 1, 1],
            'answer': 7,
            'explanation': 'original',
        },
        {
            'input': [1, 1, 1, 2],
            'answer': 3,
            'explanation': 'payload +1',
        },
        {
            'input': [2, 1, 1, 2],
            'answer': 5,
            'explanation': 'payload +1, wolf +1',
        },
        {
            'input': [1, 2, 1, 1],
            'answer': None,
            'explanation': 'impossible',
        },
    ],
    "Extra": [
        {
            'input': [9, 0, 0, 2],
            'answer': 9,
            'explanation': '1 kinds',
        },
        {
            'input': [5, 0, 5, 3],
            'answer': 7,
            'explanation': '2 kinds',
        },
        {
            'input': [3, 1, 0, 2],
            'answer': 5,
            'explanation': '2 kinds. includes goat',
        },
        {
            'input': [3, 3, 3, 3],
            'answer': 7,
            'explanation': '3 kinds',
        },
        {
            'input': [4, 3, 3, 3],
            'answer': None,
            'explanation': 'impossible',
        },
    ],
    "Randoms": make_random_tests(8)
}
