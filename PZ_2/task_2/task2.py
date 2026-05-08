import json

# Дані про кімнатні рослини
plants = [
    {
        "name": "Фікус",
        "type": "Декоративно-листяна",
        "watering": "2 рази на тиждень",
        "light": "Яскраве розсіяне світло"
    },
    {
        "name": "Кактус",
        "type": "Сукулент",
        "watering": "1 раз на 2 тижні",
        "light": "Пряме сонячне світло"
    },
    {
        "name": "Орхідея",
        "type": "Квітуча",
        "watering": "1 раз на тиждень",
        "light": "Розсіяне світло"
    }
]

# Запис у JSON-файл
with open("plants.json", "w", encoding="utf-8") as file:
    json.dump(plants, file, ensure_ascii=False, indent=4)

print("JSON-файл успішно створено!")
