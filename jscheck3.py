import re

with open('okr-builder.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find main script boundaries
script_start = None
script_end = None
for i in range(len(lines)-1, -1, -1):
    if '</script>' in lines[i] and script_end is None:
        script_end = i
    if '<script>' in lines[i] and '</script>' not in lines[i] and script_end is not None:
        script_start = i
        break

print(f"Main script: lines {script_start+1} to {script_end+1}")

depth = 0
in_single = False
in_double = False
in_template = False
in_line_comment = False
in_block_comment = False
template_nest = 0

for li in range(script_start+1, script_end):
    line = lines[li]
    prev_depth = depth
    j = 0
    while j < len(line):
        c = line[j]
        
        if in_line_comment:
            if c == '\n':
                in_line_comment = False
            j += 1
            continue
        
        if in_block_comment:
            if c == '*' and j+1 < len(line) and line[j+1] == '/':
                in_block_comment = False
                j += 2
                continue
            j += 1
            continue
        
        if in_single:
            if c == '\\': j += 2; continue
            if c == "'": in_single = False
            j += 1
            continue
        
        if in_double:
            if c == '\\': j += 2; continue
            if c == '"': in_double = False
            j += 1
            continue
        
        if in_template:
            if c == '\\': j += 2; continue
            if c == '`':
                in_template = False
                j += 1
                continue
            j += 1
            continue
        
        # Not in any string/comment
        if c == '/' and j+1 < len(line) and line[j+1] == '/':
            in_line_comment = True
            j += 2
            continue
        if c == '/' and j+1 < len(line) and line[j+1] == '*':
            in_block_comment = True
            j += 2
            continue
        if c == "'":
            in_single = True
            j += 1
            continue
        if c == '"':
            in_double = True
            j += 1
            continue
        if c == '`':
            in_template = True
            j += 1
            continue
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
        j += 1
    
    if depth < prev_depth and depth < 0:
        print(f">>> EXTRA CLOSE at line {li+1} (depth {prev_depth} -> {depth}): {line.rstrip()}")
    if depth < 0 and prev_depth >= 0:
        # Show context
        for ctx in range(max(script_start+1, li-5), min(script_end, li+3)):
            marker = ">>>" if ctx == li else "   "
            print(f"  {marker} {ctx+1}: {lines[ctx].rstrip()}")

print(f"\nFinal depth: {depth}")
if depth == 0:
    print("OK: Braces are balanced!")
else:
    print(f"ERROR: {abs(depth)} unmatched {'open' if depth > 0 else 'close'} brace(s)")
