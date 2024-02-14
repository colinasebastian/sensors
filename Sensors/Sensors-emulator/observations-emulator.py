import requests
import json
import random
import time

time_in_seconds = 2
iterations = 100000000

url = "http://localhost:8080/"
observationsEndpoint = "observations"
total_time = 1000 * time_in_seconds

f = open('sensors.json')

sensors = json.load(f)

responses = []

headers = {'Content-type': 'application/json'}

start = time.time()
print("Emulations started: ")
total = 0

while(True):
  s = sensors[random.randint(0, len(sensors) - 1)]
  data = {}
  data['esn'] = s['esn']
  properties = s['observedProperties']
  data['readings'] = []
  for p in properties:
    reading = {}
    reading['unit'] = p['unit']
    reading['name'] = p['name']
    reading['data'] = random.randint(p['lowerLimit'], p['upperLimit'] + 5)
    data['readings'].append(reading)
  response = requests.post(
    url + observationsEndpoint, json = data, headers = headers
  )
  serialized = response.json()
  print(serialized)
  total += 1
  responses.append(serialized)
  if time.time() - start > time_in_seconds or total > iterations: break

f.close()

end = time.time()
print("Emulation ended with time: ")
print(end - start)
print("Emulation ended with total posting: ")
print(total)

with open("responses.json", "w") as outfile:
    json.dump(responses, outfile)