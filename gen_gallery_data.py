import os
import json

path = r'c:\Users\bytecore\Desktop\bytecore\bytecore\bytecore\images\students'
files = [f for f in os.listdir(path) if f.endswith('.jpg')]
students = []

for f in files:
    name_part = f.rsplit('.', 1)[0]
    if '(' in name_part:
        name, course = name_part.split('(', 1)
        course = course.replace(')', '').strip()
        name = name.strip()
    else:
        name = name_part.strip()
        course = 'Batch 2024'
    
    students.append({
        'id': len(students) + 1,
        'url': 'images/students/' + f,
        'title': name,
        'category': 'students',
        'date': '2024',
        'course': course
    })

content = 'const galleryData = ' + json.dumps(students, indent=4) + ';'
output_path = r'c:\Users\bytecore\Desktop\bytecore\bytecore\bytecore\assets\js\gallery-data.js'

with open(output_path, 'w', encoding='utf-8') as f_out:
    f_out.write(content)

print(f"Success: Wrote to {output_path}")
