import urequests

# Function to store the clicked button
def store_button(button):
    url = 'http://<server_ip>:3000/store'
    headers = {'Content-Type': 'application/json'}
    data = {"button": button}
    response = urequests.post(url, json=data, headers=headers)
    print(response.text)
    response.close()

# Function to get the last clicked button
def get_last_button():
    url = 'http://<server_ip>:3000/last'
    response = urequests.get(url)
    data = response.json()
    print('Last clicked button:', data['button'])
    response.close()
store_button('S')  # Storing the 'stop' button
get_last_button()  # Retrieving the last clicked button
