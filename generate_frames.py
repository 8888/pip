def generate():
    with open('client/mascot/frames/neutral.txt', 'r', encoding='utf-8') as f:
        lines = [line.rstrip('\n') for line in f]

    # Ensure all lines are same length (pad with spaces)
    max_len = max(len(line) for line in lines)
    padded_lines = [line.ljust(max_len) for line in lines]

    # Define zones
    # Based on inspection:
    # Body seems to be roughly index 40 to 66
    # Left Wing: 0-40
    # Right Wing: 66-end
    split_left = 38
    split_right = 60

    # Create Up Frame (Wings shift UP 1 line)
    up_lines = []
    for i in range(len(padded_lines)):
        # Body comes from current line
        body = padded_lines[i][split_left:split_right]

        # Wings come from line below (visual shift up)
        if i < len(padded_lines) - 1:
            left_wing = padded_lines[i+1][:split_left]
            right_wing = padded_lines[i+1][split_right:]
        else:
            left_wing = " " * split_left
            right_wing = " " * (max_len - split_right)

        up_lines.append(left_wing + body + right_wing)

    # Create Down Frame (Wings shift DOWN 1 line)
    down_lines = []
    for i in range(len(padded_lines)):
        # Body comes from current line
        body = padded_lines[i][split_left:split_right]

        # Wings come from line above (visual shift down)
        if i > 0:
            left_wing = padded_lines[i-1][:split_left]
            right_wing = padded_lines[i-1][split_right:]
        else:
            left_wing = " " * split_left
            right_wing = " " * (max_len - split_right)

        down_lines.append(left_wing + body + right_wing)

    # Write outputs
    with open('client/mascot/frames/up.txt', 'w', encoding='utf-8') as f:
        for line in up_lines:
            f.write(line + '\n')

    with open('client/mascot/frames/down.txt', 'w', encoding='utf-8') as f:
        for line in down_lines:
            f.write(line + '\n')

if __name__ == '__main__':
    generate()
