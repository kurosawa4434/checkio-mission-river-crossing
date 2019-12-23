from math import ceil


def river_crossing(wolves, goats, cabbages, payload):
    others = wolves + cabbages

    big = max(goats, others)
    small = min(goats, others)

    # check initial state
    if small > payload:
        return None
    if small == payload and big / 2 > payload:
        return None
    if big + small <= payload:
        return 1
    if big <= payload:
        return 3

    step = 0
    rest = big

    # first step
    if small > 0:
        if (payload - small) * 2 <= payload:
            step += 4
            rest -= payload

    # need 1 step
    if rest + small <= payload:
        step += 1

    # need 3 steps
    elif rest <= payload and small <= payload:
        step += 3

    # need more steps
    elif small > 0:
        step += (rest - payload) // (max(1, payload - small)) * 2 + 3
    else:
        step += ceil(rest / (max(1, payload))) * 2 - 1

    return step
