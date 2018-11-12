import requests
from bs4 import BeautifulSoup


def get_person_by_id(id_):
    # Build API request
    url = 'https://www.idref.fr/Sru/Solr?q=id:' + str(id_)

    # Get xml/rfd data and parse it
    req = requests.get(url).content
    soup = BeautifulSoup(req, 'lxml')

    # Retrive name and dates
    last_name = soup.find('arr', {'name': 'nom_s'}).text
    first_name = soup.find('arr', {'name': 'prenom_s'}).text
    death = soup.find('date', {'name': 'datemort_dt'}).text
    birth = soup.find('date', {'name': 'datenaissance_dt'}).text

    return {
        'name': str(last_name) + ', ' + str(first_name),
        'birth': birth[:10],
        'death': death[:10]
    }


print(get_person_by_id(91588))
print(get_person_by_id(751025206))
