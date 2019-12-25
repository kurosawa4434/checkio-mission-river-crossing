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
            'explanation': [
                [' wc', 'g', ''],
                [' wc', '', 'g'],
                [' w', 'c', 'g'],
                [' w', 'g', 'c'],
                [' g', 'w', 'c'],
                [' g', '', 'wc'],
                [' ', 'g', 'wc'],
                [' ', 'g', 'wc'],
            ],
        },
        {
            'input': [1, 1, 1, 2],
            'answer': 3,
            'explanation': [
                ['  g', 'wc', '   '],
                ['  g', '  ', 'wc '],
                ['   ', ' g', 'wc '],
                ['   ', '  ', 'gwc'],
            ],
        },
        {
            'input': [2, 1, 1, 2],
            'answer': 5,
            'explanation': [
                [' wwc', ' g', '    '],
                [' wwc', '  ', 'g   '],
                ['   c', 'ww', 'g   '],
                ['   c', ' g', 'ww  '],
                ['    ', 'cg', 'ww  '],
                ['    ', '  ', 'cgww'],
            ],
        },
        {
            'input': [1, 2, 1, 1],
            'answer': None,
            'explanation': [
                ['wggc', ' ', '    '],
            ],
        },
    ],
    "Extra": [
        {
            'input': [9, 0, 0, 2],
            'answer': 9,
            'explanation': [
                ['  wwwwwww', 'ww', '         '],
                ['  wwwwwww', '  ', 'ww       '],
                ['    wwwww', 'ww', 'ww       '],
                ['    wwwww', '  ', 'wwww     '],
                ['      www', 'ww', 'wwww     '],
                ['      www', '  ', 'wwwwww   '],
                ['        w', 'ww', 'wwwwww   '],
                ['        w', '  ', 'wwwwwwww '],
                ['         ', ' w', 'wwwwwwww '],
                ['         ', '  ', 'wwwwwwwww'],
            ],
        },
        {
            'input': [5, 0, 5, 3],
            'answer': 7,
            'explanation': [
                ['   wwwwwcc', 'ccc', '          '],
                ['   wwwwwcc', '   ', 'ccc       '],
                ['      wwww', 'wcc', 'ccc       '],
                ['      wwww', '   ', 'wccccc    '],
                ['         w', 'www', 'wccccc    '],
                ['         w', '   ', 'wwwwccccc '],
                ['          ', '  w', 'wwwwccccc '],
                ['          ', '   ', 'wwwwwccccc'],
            ],
        },
        {
            'input': [3, 1, 0, 2],
            'answer': 5,
            'explanation': [
                ['  ww', 'wg', '    '],
                ['  ww', ' g', 'w   '],
                ['   g', 'ww', 'w   '],
                ['   g', '  ', 'www '],
                ['    ', ' g', 'www '],
                ['    ', '  ', 'gwww'],
            ],
        },
        {
            'input': [2, 2, 2, 2],
            'answer': 7,
            'explanation': [
                ['  wwcc', 'gg', '      '],
                ['  wwcc', '  ', 'gg    '],
                ['    ww', 'cc', 'gg    '],
                ['    ww', 'gg', 'cc    '],
                ['    gg', 'ww', 'cc    '],
                ['    gg', '  ', 'wwcc  '],
                ['      ', 'gg', 'wwcc  '],
                ['      ', '  ', 'ggwwcc'],
            ],
        },
        {
            'input': [4, 3, 3, 3],
            'answer': None,
            'explanation': [
                ['wwwwgggccc', '  ', '       '],
            ],
        },
    ],
    "Randoms": make_random_tests(8)
}
