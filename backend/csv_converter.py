import json
import csv

with open("test_data.csv", "r") as f:
    reader = csv.reader(f)
    next(reader)
    data = {"products": []}
    for row in reader:
        data["products"].append({"product_id" : row[0], "product_name": row[1], "availability": row[2], "product_category": row[3], "brand": row[4], "color": row[5], "description": row[6], "gender": row[7], "size": row[8], "material": row[9], "retail_price": row[10], "product_url": row[11], "product_image_url": row[12], "additional_image_link": row[13] })

with open ("products.json", "w") as f:
    json.dump(data, f, indent=4 )