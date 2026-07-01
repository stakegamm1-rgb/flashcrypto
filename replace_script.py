import os

file_path = "/Users/apple/Documents/Delaine/work/crypto master/src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace phone numbers
content = content.replace("919588705078", "40758563968")
content = content.replace("+91 9588705078", "40758563968")
content = content.replace("+91 9588705078", "40758563968")

# Replace WhatsApp channel ID
content = content.replace("0029VakXsmX9cDDc9zEpAW0X", "0029Vakbup91Hspodzr8Gj0u")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Replaced phone numbers and links successfully.")
