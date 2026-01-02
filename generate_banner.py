import html

ascii_art = """
              --++++---.   ++                                        -+   .---++++--                  
      -++++++++++++++#####+++-                                      -+++####+++++++++++++++-          
   .++------------+###+++-+#++-                                    -+++#-++++##+-------------+.       
 .#-----------+++--------+#+++++.        .++.        .++.        .+++--#+--------+++-----------+.     
-----------++-----------+++---+#+-.       -+#++++-+++#+-       .-+#+---+++-----------++-----------    
      .--++-------------++---+-++++--      -++-++++-+++      ---+++-+---+#--------------+--.          
        ++-------------++-------+#++---.   -++++++++++-   .---++#+-------++-------------++            
               .------++---------+#++++++++##++++++++##++++++++#+---------++------.                   
                 .----+------------++#++++++++##++##++++++++#++------------+----.                     
                   ---+---------------+++##++++++++++++##+++---------------+---                       
                    -+-------------------++##++++++++##++-------------------+-                        
                     -.     --------------++#+++++++++++--------------     .-                         
                               .-----------+#++++++++++-----------.                                   
                                  ---------++++++++++#+---------                                      
                                    -------+#++++++++++-------                                        
                                     -----++++++++++++++-----                                         
                                      .---+++#+++-++#+++----                                          
                                       .--++++.    .-+++--.                                           
                                         +++-.       -++-.                                            
                                      .++++.          .++++.                                          
                                      .-+++            +++-.                                          
"""

lines = [line for line in ascii_art.split('\n') if line.strip() or len(line) > 0]
# Remove empty first/last lines if they are just newline artifacts, 
# but looking at the input, the first line is empty in the string literal.
if lines and not lines[0].strip():
    lines.pop(0)
if lines and not lines[-1].strip():
    lines.pop(-1)

font_size = 10
line_height = 10
char_width = 6 # Approximate for monospace 10px
width = max(len(line) for line in lines) * char_width + 40 # padding
height = len(lines) * line_height + 40 # padding

svg_content = f'''<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#0d1117"/>
    <style>
        .ascii-text {{
            font-family: monospace;
            font-size: {font_size}px;
            fill: #58a6ff;
            white-space: pre;
        }}
    </style>
    <text x="20" y="30" class="ascii-text">'''

for i, line in enumerate(lines):
    # Using tspan for each line to ensure exact positioning
    escaped_line = html.escape(line)
    svg_content += f'<tspan x="20" dy="{line_height}">{escaped_line}</tspan>'

svg_content += '''
    </text>
</svg>'''

with open("docs/assets/banner.svg", "w") as f:
    f.write(svg_content)

print(f"Generated docs/assets/banner.svg with size {width}x{height}")
