import requests
from bs4 import BeautifulSoup

# URL of the webpage
url = 'https://www.samsung.com/us/smartphones/galaxy-s24-ultra/'

# Send a GET request to the URL
try:
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for 4XX and 5XX status codes
except requests.RequestException as e:
    print("Failed to retrieve the webpage:", e)
    exit()

# Check if the request was successful
if response.status_code == 200:
    # Parse the HTML content of the webpage
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Find all visible text elements
    visible_text = [element.get_text(strip=True) for element in soup.find_all(string=True)]
    
    # Filter out empty strings and strip leading/trailing whitespace
    visible_text = [text.strip() for text in visible_text if text.strip()]
    
    # Create or open a text file to write the visible text data
    with open('samsung_website_text_data.txt', 'w', encoding='utf-8') as file:
        # Write the visible text data to the text file
        file.write("\n".join(visible_text))
    
    print("Visible text data from the website saved to 'samsung_website_text_data.txt'")
else:
    print("Failed to retrieve the webpage. Status code:", response.status_code)
